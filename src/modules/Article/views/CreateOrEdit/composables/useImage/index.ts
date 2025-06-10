import { ref } from 'vue'
import useImageUpdate from "./useImageUpdate"
import type { Ref } from "vue";
import type { ImageType,  Base64} from "@/modules/Article/types/Image";

export default () => {
  const base64Images = ref([] as Base64<ImageType>[]);
  const imagePaths: Ref<string[]> = ref([]);

  const { 
    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  } = useImageUpdate(base64Images, imagePaths);  

  return {
    imagePaths,
    base64Images,

    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  }
}
