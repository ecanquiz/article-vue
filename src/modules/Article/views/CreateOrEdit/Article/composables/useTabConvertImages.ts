
import AssetFile from "@/modules/Article/services/AssetFile";
import type { ImageType, Base64} from "@/modules/Article/types/Image";

export default function () {
  const convertBlobToBase64 = (blob: any)=> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const convertImage = async (articleId: string|number, imageName: string) => {
    const response = await AssetFile.getPublicFile(articleId, imageName);
    const blob = await response.data;
    const base64 = await convertBlobToBase64(blob) as Base64<ImageType>;

    return base64;
  }

  const convertImages = async (articleId: string|number, imageNameArray: string[]) => {
    const promises = imageNameArray.map(
      (image: string) => convertImage(articleId, image)
    );
    return await Promise.all(promises);
  }

  return { convertImages }
}