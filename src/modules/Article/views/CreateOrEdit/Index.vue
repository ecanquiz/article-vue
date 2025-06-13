<script lang="ts" setup>
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import useDescription from './composables/useDescription'
import useImage from './composables/useImage/index'
import ArticleTab from './Article/components/Tab.vue'
import ArticleDetailTab from './ArticleDetail/components/Tab.vue'

const props = defineProps<{ id?: string }>()
const router = useRouter();

const { articleDescription } = useDescription();

const {
  images,

  addImage,
  addImages,
  removeImage,
  removeImages  
} = useImage()

provide('article-description', articleDescription);
provide('image-paths', {
  images,
  
  addImage,
  addImages,
  removeImage,
  removeImages
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
  </div>
</div>
</template>

<style scoped>
.myPanel {
  border: 1px solid;
  padding: 10px;
}
</style>
