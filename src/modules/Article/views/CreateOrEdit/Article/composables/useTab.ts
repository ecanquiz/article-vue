import { onMounted, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/core/composables/useHttp";
import ArticleService from "@/modules/Article/services/Article";
import useTabConvertImages from "./useTabConvertImages"
import type { Ref } from "vue";
import type { Article } from "@/modules/Article/types/Article"
import type { Images, ImageType, Base64} from "@/modules/Article/types/Image";

export default (articleId?: string) => {
  const router = useRouter();

  const articleDescription:Ref<string, string> = inject('article-description');

  const {
    images,
    addImage
  }: {
    images: Ref<Images>,
    addImage: (imageOrInfoOf: string | Base64<ImageType>)=> void,
  } = inject('image-paths');

  const article: Article = reactive({
    int_cod: "", 
    name: "",
    description: "",     
    status: "", 
    images: [], 
    id_user_insert: "", 
    id_user_update: "", 
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()

  const { convertImages } = useTabConvertImages();
  
  onMounted( () => {
    if (articleId) {
      pending.value = true
      ArticleService.getArticle(articleId)
        .then(async (response) => { 
          article.int_cod = response.data.data.int_cod; 
          article.name = response.data.data.name;
          articleDescription.value = response.data.data.description;
          article.status = response.data.data.status ? true : false;
          article.images = response.data.data.images;
          article.id_user_insert = response.data.data.id_user_insert;
          article.id_user_update = response.data.data.id_user_update;

          const base64Images = await convertImages(article.images);
          base64Images.forEach(base64Image => addImage(base64Image));          
        })
        .catch((err) => {        
          errors.value = getError(err);
        })
        .finally(() => {
          pending.value = false;
        })
    }    
  })

  const insertArticle = async (article: Article) => {
    pending.value = true
    return ArticleService.insertArticle(article)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: `/articles/edit/${response.data.id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateArticle = async (article: Article, articleId: string) => {
    pending.value= true
    console.log(article)
    article.bases64 = images.value.base64
    article._method = 'PUT'
    return ArticleService.updateArticle(articleId, article)
      .then((response) => {
        alert( response.data.message )
        //router.push( { path: '/articles' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (article: Article) => {    
    !articleId ? insertArticle(article) : updateArticle(article, articleId)
  }

  return {    
    article,
    errors,
    pending,

    submit
  }
}
