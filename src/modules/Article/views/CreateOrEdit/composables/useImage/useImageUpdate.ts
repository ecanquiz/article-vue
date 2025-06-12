import { validateBase64 } from "@/core/utils"
import useImageToBase64 from "./useImageToBase64"
import type { Ref } from "vue";
import type { Images, ImageType,  Base64} from "@/modules/Article/types/Image";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

export default (images: Ref<Images>) => {
  const {
    convertImage,
    convertImages
  } = useImageToBase64(images);

  const addImagePath = (imageOrInfoOf: string | Base64<ImageType>) => {
    if (
      images.value.base64.includes(imageOrInfoOf as Base64<ImageType>)
      || images.value.path.includes(imageOrInfoOf)
    ) {
      alert('Disculpe, esta imagen ya existe.')
      return;
    }

    if (validateBase64(imageOrInfoOf)) {
      images.value.base64.unshift(imageOrInfoOf as Base64<ImageType> )
    } else {
      convertImage(imageOrInfoOf.replace('storage/',''))
      images.value.path.unshift(imageOrInfoOf);
    }
  }
  
  const addAllImagePaths = async (articleDetails: ArticleDetail[]) => {
    images.value.path = articleDetails.map(
      (articleDetail: ArticleDetail) => articleDetail.photo_path
    );
    await convertImages();
  }
  
  const removeImagePath = (index: number): void => {
    if (confirm('¿Desea eliminar esta imagen?')) {
      images.value.base64.splice(index, 1);
    }
  }

  const removeAllImagePaths = (): void => {
    if (confirm('¿Desea eliminar todas las imágenes?')) {
      images.value.base64 = [];
      images.value.path = [];
    }
  }    

  return {
    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  }
}
