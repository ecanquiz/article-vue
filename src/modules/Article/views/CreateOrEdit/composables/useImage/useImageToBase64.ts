import PresentationService from "@/modules/Article/services/PresentationService"
import type { Ref } from "vue";
import type { Images, ImageType,  Base64} from "@/modules/Article/types/Image";

export default (images: Ref<Images>) => {
  async function convertImageToBase64(imagePath: string) {
    const response = await PresentationService.getPublicFile(imagePath);
    const blob = await response.data;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const convertImages = async function() {
    const promises = images.value.path.map(imagePath => convertImageToBase64(imagePath.replace('storage/', '')));
    images.value.base64 = await Promise.all(promises) as Base64<ImageType>[];
  }

  const convertImage = async function(imagePath: string) {
    const promise = await convertImageToBase64(imagePath.replace('storage/', ''));
    images.value.base64.unshift(promise as unknown as Base64<ImageType>)
  }  

  return {
    convertImage,
    convertImages
  }
}