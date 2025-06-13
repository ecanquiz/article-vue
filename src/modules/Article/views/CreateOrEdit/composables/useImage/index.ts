import { ref } from 'vue'
import useImageUpdate from "./useImageUpdate"
import type { Ref } from "vue";
import type { Images } from "@/modules/Article/types/Image";

export default () => {
  const images: Ref<Images> = ref({
    base64: [],
    path: []
  }) 

  const { 
    addImage,
    addImages,
    removeImage,
    removeImages
  } = useImageUpdate(images);  

  return {
    images,

    addImage,
    addImages,
    removeImage,
    removeImages
  }
}
