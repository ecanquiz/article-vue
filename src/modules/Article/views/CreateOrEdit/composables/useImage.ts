import { ref } from 'vue'
import { Http as h } from "@/core/utils/Http";
import { productInit } from "@/core/utils/Http/init";
import type { Ref } from "vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";
import type { ImageType,  Base64} from "@/modules/Article/types/Image";

export default () => {
  const base64Images = ref([] as Base64<ImageType>[]);
  const imagePaths: Ref<string[]> = ref([]);

  async function convertImageToBase64(url) {
    const Http = new h( productInit );

    const response = await Http.get(`api/public-file/${url}`, "blob");
    const blob = await response.data;
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
    const promises = imagePaths.value.map(url => convertImageToBase64(url.replace('storage/', '')));
    base64Images.value = await Promise.all(promises) as Base64<ImageType>[];
  }

  async function convertImage(url) {
    const promise = await convertImageToBase64(url.replace('storage/', ''));
    
    base64Images.value.unshift(promise as unknown as Base64<ImageType>)
  }

  /**
   * Important: It's crucial to note that these functions can't guarantee 100% that a string is Base64, but they do provide robust verification. In some cases, malformed strings may pass character validation but fail decoding.
   * Alternative (Node.js): If you're working with Node.js, you can use the Buffer module to verify the string.
   * 
   * // Node.js
   * function isBase64Node(str) {
   *   try {
   *     const buffer = Buffer.from(str, 'base64');
   *     return str === buffer.toString('base64');
   *   } catch (error) {
   *     return false;
   *   }
   * }
   */

  function isBase64(str: string) {
     const regex = /^[A-Za-z0-9+/]*={0,2}$/;
     return regex.test(str);
  }

  function isValidBase64(str: string) {
     try {
       const decoded = atob(str);
       const encoded = btoa(decoded);
       return str === encoded;
     } catch (error) {
       return false;
     }
  }

  function validateBase64DataURL(dataURL: string) {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,(.+)$/;
    const match = dataURL.match(base64Regex);
    if (match) {
        const base64String = match[1];
        return isBase64(base64String) && isValidBase64(base64String);
    }
    return false;
  }

  const addImagePath = (articleDetail: string) => {
    if (imagePaths.value.includes(articleDetail)) {
      alert('Disculpe, esta imagen ya existe.')
      return;
    }

    if (validateBase64DataURL(articleDetail)) {
      base64Images.value.unshift(articleDetail as Base64<ImageType> )
    } else {
      convertImage(articleDetail.replace('storage/',''))
      imagePaths.value.unshift(articleDetail);
    }
  }
  
  const addAllImagePaths = async (articleDetails: Ref<ArticleDetail[]>) => {
    imagePaths.value = articleDetails.value.map(
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
    imagePaths,
    base64Images,

    addImagePath,
    addAllImagePaths,
    removeImagePath,
    removeAllImagePaths
  }

}


