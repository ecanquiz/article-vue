import { validateBase64 } from "@/core/utils"
import useImageToBase64 from "./useImageToBase64"
import type { Ref } from "vue";
import type { ImageType,  Base64} from "@/modules/Article/types/Image";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

export default (base64Images: Ref<Base64<ImageType>[]>, imagePaths: Ref<string[]>) => {
  const {
    convertImage,
    convertImages
  } = useImageToBase64(base64Images, imagePaths);

  const addImagePath = (imageOrInfoOf: string | Base64<ImageType>) => {
    if (
      base64Images.value.includes(imageOrInfoOf as Base64<ImageType>)
      || imagePaths.value.includes(imageOrInfoOf)
    ) {
      alert('Disculpe, esta imagen ya existe.')
      return;
    }

    if (validateBase64(imageOrInfoOf)) {
      base64Images.value.unshift(imageOrInfoOf as Base64<ImageType> )
    } else {
      convertImage(imageOrInfoOf.replace('storage/',''))
      imagePaths.value.unshift(imageOrInfoOf);
    }
  }
  
  const addAllImagePaths = async (articleDetails: ArticleDetail[]) => {
    imagePaths.value = articleDetails.map(
      (articleDetail: ArticleDetail) => articleDetail.photo_path
    );
    await convertImages();
  }
  
  const removeImagePath = (index: number): void => {
    if (confirm('¿Desea eliminar esta imagen?'))
      base64Images.value.splice(index, 1);
  }

  const removeAllImagePaths = (): void => {
    if (confirm('¿Desea eliminar todas las imágenes?'))  
      base64Images.value = [];
  }    

  return {
    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  }
}
