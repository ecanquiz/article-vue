<script setup lang="ts">
import { inject, toRaw } from 'vue'
import IconCamera from "@/core/components/icons/IconCamera.vue"
import type { Ref } from 'vue'
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'removeArticleDetail', articleDetailId: string): void
  (e: 'getArticleDetails' ): void
}>()

const removeArticleDetail =  (articleDetailId: string) => {
  emits("removeArticleDetail", articleDetailId)
};

const { addImagePath, addAllImagePaths }: {
    imagePaths: Ref<string>,
    addImagePath: (imagePath: string)=> void,
    addAllImagePaths: (arra: ArticleDetail[])=> void
  } = inject('image-paths');

const status = (s: ArticleDetail["status"]) => s ? 'Activo' : 'Inactivo';

const imgPath = (article_detail) => `${import.meta.env.VITE_PRODUCT_API_URL}/${article_detail.photo_path}`

const addImg = (photoPath: string) => {
  // alert(photoPath)
  addImagePath(photoPath)
}

const addImgs = () => {
  // alert(props.article_details.map(articleDetail => articleDetail.photo_path))
  addAllImagePaths(toRaw(props.article_details))
}

</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-base text-gray-700 capitalize dark:text-gray-400">
        <tr>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 normal-case">Código de Barra</th>
          <th class="px-6 py-3">Categoría</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Producto</th>
          <th class="px-6 py-3">Marca</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Empaque</th>
          <th class="px-6 py-3 ">Cantidad</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Estatus</th>
          <th class="px-6 py-3 ">
            
            <div class="flex">
              <span class="mt-1 cursor-pointer" @click="addImgs()">Imagen</span>
              <!--AppButton
                @click="addImgs()"
                class="btn btn-xs ml-1 text-blue-500 hover:text-blue-700"
              >
                Adds
              </AppButton-->
            </div>

          </th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Acción(es)</th>

        </tr>
      </thead>
      <tbody>      
        <tr v-for="article_detail in props.article_details" :key="article_detail.id">
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{ article_detail.bar_cod }}</td>
          <td class="px-6 py-3">{{ article_detail.category }}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{ article_detail.product }}</td>
          <td class="px-6 py-3">{{ article_detail.mark  }}</td>          
          <td class="px-6 py-3 bg-gray-50 bg-base-200" id="article_detail.presentation_id">              
            {{ article_detail.packing_deployed  }}
          </td>
          <td class="px-6 py-3 text-right">
            {{ article_detail.quantity }}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            {{ status(article_detail.status) }}
          </td>
          <td class="px-6 py-3">
            <div class="flex" v-if="article_detail.photo_path">
               <img              
                 class="m-auto w-10 cursor-pointer"
                :src=imgPath(article_detail)
                @click="addImg(article_detail.photo_path)"
              />
              <!--AppButton
                @click="addImg(article_detail.photo_path)"
                class="btn btn-xs ml-1 text-blue-500 hover:text-blue-700"              
              >
                Add
              </AppButton-->
            </div>          
            
            <IconCamera
              v-else
              class="w-7 h-7 m-auto fill-current"              
            />
                                   
          </td>   
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            <div class="flex items-center space-x-1">         
              <AppButton
                @click="removeArticleDetail(article_detail.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>    
  </div>  
</template>
