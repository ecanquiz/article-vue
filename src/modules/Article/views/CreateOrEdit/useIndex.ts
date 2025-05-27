import { ref } from 'vue'
import type { Ref } from "vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

export default () => {
  const articleDescription: Ref<string> = ref('');
  const photoPaths: Ref<string[]> = ref([]);

  const updatePhotoPaths = (articleDetails: Ref<ArticleDetail[]>) => 
    photoPaths.value = articleDetails.value.map(
      (articleDetail: ArticleDetail) => articleDetail.photo_path
    );  

  return {
    articleDescription,
    photoPaths,

    updatePhotoPaths   
  }

}
