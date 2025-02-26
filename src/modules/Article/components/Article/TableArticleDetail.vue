<script setup lang="ts">
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'removeArticleDetail', articleDetailId: string): void
  (e: 'getArticleDetails' ): void
}>()

const removeArticleDetail =  (articleDetailId: string) => {
  emits("removeArticleDetail", articleDetailId)
};

const status = (s: ArticleDetail["status"]) => s ? 'Activo' : 'Inactivo';
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
          <th class="px-6 py-3 ">Acción(es)</th>
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
            <div class="flex items-center space-x-1">             
              <AppBtn
                @click="removeArticleDetail(article_detail.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>    
  </div>  
</template>
