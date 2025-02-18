<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import TabArticle from '../../components/Article/TabArticle.vue'
import TabArticleDetail from '../../components/Article/TabArticleDetail.vue'

const props = defineProps<{ id?: string }>()
const router = useRouter();

const articleDescription = ref('');
provide('article-description', articleDescription )
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
