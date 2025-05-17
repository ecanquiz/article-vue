<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import ArticleTab from './Article/components/Tab.vue'
import ArticleDetailTab from './ArticleDetail/components/Tab.vue'
import type { Ref } from "vue";
import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

const props = defineProps<{ id?: string }>()
const router = useRouter();
const articleDescription: Ref<string> = ref('');
const photoPaths: Ref<string[]> = ref([])
const updatePhotoPaths = (articleDetails: Ref<ArticleDetail[]> ) => 
  photoPaths.value = articleDetails.value.map(
    (articleDetail: ArticleDetail) => articleDetail.photo_path
  );

provide('article-description', articleDescription);
provide('photo-paths', { photoPaths, updatePhotoPaths });
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
