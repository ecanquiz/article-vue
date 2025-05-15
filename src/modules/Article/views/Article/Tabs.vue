<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import TabArticle from '../../components/Article/TabArticle.vue'
import TabArticleDetail from '../../components/Article/TabArticleDetail.vue'
import type { Ref } from "vue";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

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
    <TabArticle :id="props.id"/>
    <TabArticleDetail :id="props.id"/>
  </div>
</div>
</template>

<style scoped>
.myPanel {
  border: 1px solid;
  padding: 10px;
}
</style>
