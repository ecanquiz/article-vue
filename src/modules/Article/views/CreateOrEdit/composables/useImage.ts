import { ref } from 'vue'
import { Http as h } from "@/core/utils/Http";
import { productInit } from "@/core/utils/Http/init";
import type { Ref } from "vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

type ImageType = 'png' | 'jpeg'
type Base64<imageType extends ImageType> = `data:image/${imageType};base64${string}`


export default () => {


  const base64Images = ref([] as Base64<ImageType>[]);

  const imagePaths: Ref<string[]> = ref([]);


  async function convertImageToBase64(url) {
    const Http = new h( productInit );

    const response = await Http.get(`api/public-file/${url}`, "blob");
    const blob = await response.data;
    console.log(blob)
    const reader = new FileReader();
 
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function convertImages() {
    console.log(imagePaths.value)
    const promises = imagePaths.value.map(url => convertImageToBase64(url.replace('storage/', '')));
    base64Images.value = await Promise.all(promises) as Base64<ImageType>[];

    console.log(base64Images.value)
  }

    async function convertImage(url) {
    const promise = await convertImageToBase64(url.replace('storage/', ''));
    
    base64Images.value.unshift(promise as unknown as Base64<ImageType>)
    console.log('promise', promise)
  }

//////////////////////////////////



  const addImagePath = (articleDetail: string) => {
    if (imagePaths.value.includes(articleDetail)) {
      alert('Disculpe, esta imagen ya existe.')
      return;
    }
    
    convertImage(articleDetail.replace('storage/',''))
    imagePaths.value.unshift(articleDetail)
  }
  
  const addAllImagePaths = async (articleDetails: Ref<ArticleDetail[]>) => {
    imagePaths.value = articleDetails.value.map(
      (articleDetail: ArticleDetail) => articleDetail.photo_path
    );
    await convertImages();
  } 

  return {
    imagePaths,
    base64Images,

    addImagePath,
    addAllImagePaths   
  }

}


