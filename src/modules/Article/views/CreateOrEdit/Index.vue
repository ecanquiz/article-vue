<script lang="ts" setup>
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import useIndex from './useIndex'
import ArticleTab from './Article/components/Tab.vue'
import ArticleDetailTab from './ArticleDetail/components/Tab.vue'
import TestComponent from './TestComponent.vue'


const props = defineProps<{ id?: string }>()
const router = useRouter();

const {
    articleDescription,
    imagePaths,

    addImagePath,
    addAllImagePaths   
  } = useIndex()

provide('article-description', articleDescription);
provide('image-paths', {
  imagePaths,
  
  addImagePath,
  addAllImagePaths
 });
</script>

<template>
<div>
  <AppPageHeader>Artículos / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
  <div  class="flex space-x-2">
    <button
      class="btn btn-primary mb-4"
      @click="router.push({ path: '/articles' })"
    >
      Ver todos
    </button>
  </div>

  <div class="myPanel">
    <ArticleTab :id="props.id"/>
    <ArticleDetailTab :id="props.id"/>
    <TestComponent />
  </div>
</div>
</template>

<style scoped>
.myPanel {
  border: 1px solid;
  padding: 10px;
}
</style>
