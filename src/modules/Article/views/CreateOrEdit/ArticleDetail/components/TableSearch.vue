<script setup lang="ts">
//https://dev.to/razi91/vue-arrays-and-v-model-17e0
// import { toRaw} from "vue"
import { markRaw, reactive, watch} from "vue"
import useTableGrid from "../composables/useTableGrid"
import IconCamera from "@/core/components/icons/menu/icon-products.vue"
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

const props = defineProps<{ selectedPresentations: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'selectPresentation', articleDetail: object): void
  (e: 'qtyPresentation', articleDetail: object): void
}>()

const selectedPresentation = reactive([])
const quantityPresentation = reactive([])
  
const data = reactive({
  rows: [],
  page: "1",
  search: "",
  sort: "",
  direction: "",
  links: []  
})

const {
  getSearch,
  setSearch,
  setSort, 
} = useTableGrid(data)

const classTr = (index) => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}

type Presentation = {
  id: string;
  bar_cod: string;
  category: string;
  mark: string;
  packing_deployed: string;
  photo_path: string;
  product: string;
  quantity: number;
}

const selectPresentation =  (id: string, quantity: number=1, presentation ) => {
  //emits("selectPresentation", { id , quantity })
  delete presentation.status
  emits("selectPresentation", { quantity , ...presentation })

  quantityPresentation.values[id] = quantity;
  selectedPresentation[id] = !selectedPresentation[id];
}

const convertToNumber = (qtyStr: string): void|number => {
  const qtyNumber = parseInt(qtyStr)
  return (!qtyNumber) ? alert("Error: Ingrese números") : qtyNumber; 
}

const setQuantity = (presentationId): void => {
  const qtyStr: string = prompt('Por favor ingrese la cantidad') 
  const qtyNumber: void|number = convertToNumber(qtyStr)
  if (qtyNumber)
    emits("qtyPresentation", { id: presentationId , qty: qtyNumber })
}

watch(props.selectedPresentations, (selectedPresentations) => {
  selectedPresentations.forEach((sp)=> {
    quantityPresentation.values[sp.id] = sp.quantity
  })
}, { deep: true })

const imgPath = (presentation) => `${import.meta.env.VITE_PRODUCT_API_URL}/${presentation.photo_path}`
</script>

<template>  
  <div class="overflow-x-auto panel">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex w-full bg-white shadow rounded">
          <input
            class=""
            type="text"
            v-model="data.search"
            @input="setSearch"
            placeholder="Buscar…"
          />
        </div>
      </div>
    </div>
      
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">     
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-base text-gray-700 capitalize dark:text-gray-400">
        <tr class="bg-base-100">
          <th class="px-4 py-1">Acción(es)</th>
          <th class="px-4 py-1">Imagen</th>    
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('presentations.bar_cod')">
                Código de barra
            </AppButton>
          </th>      
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('family')">
              Categoría
            </AppButton>
          </th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('products.name')">
                Producto
            </AppButton>
          </th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('marks.name')">
                Marca
            </AppButton>
          </th>
          <th class="px-4 py-1">Empaque</th>
          <!--th class="px-4">Estatus</th-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(presentation, index) in data.rows" :key="index" :class="classTr(index)">
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
              <label>Seleccionar</label>   <!--{{ selectedPresentation[presentation.id] }}-->
              <input
                class="my-3"
                type="checkbox"
                v-model="selectedPresentation[presentation.id]"
                :value="presentation.id"
                @click="selectPresentation(presentation.id, 1, presentation)"
              />
                        
              <AppButton
                v-show="selectedPresentation[presentation.id]"
                @click="setQuantity(presentation.id)"
                type="button"
                class="btn btn-primary btn-xs"
              >ModQty|{{ quantityPresentation.values[presentation.id]}}</AppButton>
            </div>
          </td>
          <td class="px-4 py-1">
            <img
              v-if="presentation.photo_path"
              class="m-auto hover:cursor-pointer w-7 h-7"
              :src=imgPath(presentation)              
            />
            <IconCamera
              v-else
              class="w-7 h-7 m-auto fill-current hover:cursor-pointer"              
            />
          </td>
          <td class="px-4 py-1">{{presentation.bar_cod}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.category}}</td>
          <td class="px-4 py-1" :id='presentation.packing'>{{presentation.product}}</td>          
          <td class="px-4 py-1 text-justify">{{presentation.mark}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.packing_deployed}}</td>
          <!--td class="px-6 py-1">{{presentation.status}}</td-->          
        </tr>
      </tbody>
    </table>
  </div>
  <AppPaginationComponent
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  />
  <div class="hidden">{{ props.selectedPresentations }}</div>
  </div>
</template>
