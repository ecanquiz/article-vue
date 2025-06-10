import PresentationService from "@/modules/Article/services/PresentationService"
import type { Ref } from "vue";
import type { ImageType,  Base64} from "@/modules/Article/types/Image";

export default (base64Images: Ref<Base64<ImageType>[]>, imagePaths: Ref<string[]>) => {
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
    const promises = imagePaths.value.map(imagePath => convertImageToBase64(imagePath.replace('storage/', '')));
    base64Images.value = await Promise.all(promises) as Base64<ImageType>[];
  }

  const convertImage = async function(imagePath: string) {
    const promise = await convertImageToBase64(imagePath.replace('storage/', ''));
    base64Images.value.unshift(promise as unknown as Base64<ImageType>)
  }  

  return {
    convertImage,
    convertImages
  }
}