import { ref } from 'vue'
import type { Ref } from "vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

export default () => {
  const imagePaths: Ref<string[]> = ref([]);

  const addImagePath = (articleDetail: string) => {
    if (imagePaths.value.includes(articleDetail)) {
      alert('Disculpe, esta imagen ya existe.')
      return;
    }

    imagePaths.value.unshift(articleDetail)
  }
  
  const addAllImagePaths = (articleDetails: Ref<ArticleDetail[]>) => {
    imagePaths.value = articleDetails.value.map(
      (articleDetail: ArticleDetail) => articleDetail.photo_path
    ); 
  } 

  return {
    imagePaths,

    addImagePath,
    addAllImagePaths   
  }

}


