import PresentationService from "@/modules/Article/services/PresentationService"
import type { Ref } from "vue";
import type { Images, ImageType,  Base64} from "@/modules/Article/types/Image";

const convertBlobToBase64 = async (blob: any)=> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default (images: Ref<Images>) => {
  async function convertImageToBase64FromE2E(imagePath: string) {
    const response = await PresentationService.getPublicFile(imagePath);
    const blob = await response.data;

    return convertBlobToBase64(blob);
  }

  const convertImages = async function() {
    const promises = images.value.path.map(imagePath => convertImageToBase64FromE2E(imagePath.replace('storage/', '')));
    images.value.base64 = await Promise.all(promises) as Base64<ImageType>[];
  }

  const convertImage = async function(imagePath: string) {
    const promise = await convertImageToBase64FromE2E(imagePath.replace('storage/', ''));
    images.value.base64.unshift(promise as unknown as Base64<ImageType>)
  }  

  return {
    convertImage,
    convertImages
  }
}