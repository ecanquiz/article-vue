<script setup lang="ts">
import { toRaw, ref } from "vue"
import TableSearchArticleDetail from "./TableSearch.vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

const emits = defineEmits<{
  (e: 'submitArticleDetail', articleDetails: ArticleDetail[]): void
}>()

const selectedPresentations = ref([])

const submitArticleDetail = async () => {
  const articleDetails: ArticleDetail[] = toRaw(selectedPresentations.value);
  !articleDetails.length
    ? alert('Debe seleccionar algún producto.')
      : emits("submitArticleDetail", articleDetails);
}

const selectPresentation = (presentation) => {
  const indexFound = selectedPresentations.value.findIndex((i)=> i.id === presentation.id);
  (indexFound===-1) 
    ? selectedPresentations.value.push(presentation)
    : selectedPresentations.value.splice(indexFound,1);
}

const qtyPresentation = (presentation) => {
  const indexFound = selectedPresentations.value.findIndex((i)=> i.id === presentation.id);
  if (indexFound===-1) { return; } 
  selectedPresentations.value[indexFound].quantity = presentation.qty 
}
</script>

<template>
  <div class="overflow-x-auto">
    <TableSearchArticleDetail
      :selectedPresentations="selectedPresentations"
       @selectPresentation="selectPresentation"
       @qtyPresentation="qtyPresentation"

    /> 
    <form @submit.prevent="submitArticleDetail">
      <div class="block flex justify-center mt-4">
        <AppButton
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Agregar"
        />        
      </div> 
    </form>
  </div>
</template>
