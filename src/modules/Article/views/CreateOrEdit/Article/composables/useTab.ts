import { onMounted, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/core/composables/useHttp";
import ArticleService from "@/modules/Article/services/Article";
import AssetFile from "@/modules/Article/services/AssetFile";
import type { Ref } from "vue";
import type { Article } from "@/modules/Article/types/Article"
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";
import type { ImageType, Base64} from "@/modules/Article/types/Image";


export default (articleId?: string) => {
  const router = useRouter();

  const articleDescription:Ref<string, string> = inject('article-description');

  const { addImage, /*addImages*/ }: {
  addImage: (imageOrInfoOf: string | Base64<ImageType>)=> void,
  addImages: (articleDetails: ArticleDetail[])=> void
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
  
  onMounted(() => {
    if (articleId) {
      pending.value = true
      ArticleService.getArticle(articleId)
        .then((response) => { 
          article.int_cod = response.data.data.int_cod; 
          article.name = response.data.data.name;
          articleDescription.value = response.data.data.description;
          article.status = response.data.data.status ? true : false;
          article.images = response.data.data.images;
          article.id_user_insert = response.data.data.id_user_insert;
          article.id_user_update = response.data.data.id_user_update;
          convertImages();
        })
        .catch((err) => {        
          errors.value = getError(err);
        })
        .finally(() => {
          pending.value = false;
        })
    }    
  })

  const convertBlobToBase64 = async (blob: any)=> {
    return await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const convertImage = async (urlPath: string) => {
    const response = await AssetFile.getPublicFile(urlPath);
    const blob = await response.data;
    const base64 = await convertBlobToBase64(blob) as Base64<ImageType>;
    
    addImage(base64);
  }

  const convertImages = async () => 
    article.images.map(
      image => convertImage(image)
    );  

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
