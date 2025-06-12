import { ref } from 'vue'
import useImageUpdate from "./useImageUpdate"
import type { Ref } from "vue";
import type { Images, ImageType,  Base64} from "@/modules/Article/types/Image";

export default () => {
  const images: Ref<Images> = ref({
    base64: [],
    path: []
  }) 

  const { 
    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  } = useImageUpdate(images);  

  return {
    images,

    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  }
}
