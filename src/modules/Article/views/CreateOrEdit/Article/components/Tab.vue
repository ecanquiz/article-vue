<script setup lang="ts">
import { computed } from "vue"
import FormArticle from './Form.vue';
import useTabArticle from "../composables/useTab";

const props = defineProps<{ id?: string }>()

const {  
  article,
  errors,
  pending,      
  submit    
} = useTabArticle(props.id)

const isTrue = computed(
  () => article && article.int_cod || !props.id
) 
</script>

<template>
<div class="">
  <FormArticle
    v-if="isTrue"
    :article="article"
    :errors="errors"
    :pending="pending"
    @submit="submit"    
  />
</div>
</template>
  
