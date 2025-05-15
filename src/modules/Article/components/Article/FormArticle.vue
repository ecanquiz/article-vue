<script setup lang="ts">
import { inject } from "vue";
import useFormArticle from "../../composables/Article/useFormArticle";
import type { Ref } from "vue";
import type { Article } from "../../types/Article";
import GalleryImages from "./GalleryImages.vue";

const articleDescription:Ref<string> = inject('article-description');
const { photoPaths }: { photoPaths: Ref<string> } = inject('photo-paths');

const props = defineProps<{
  article: Article
  errors?: String | Object
  pending: Boolean  
}>()

const emits = defineEmits<{
  (e: 'submit', form: Article): void
}>()

const {
  form,
  errors,
  pending,

  v$
} = useFormArticle(props.article)

const submit = async () => {  
  const result = await v$.value.$validate();

  if (result) {
    emits("submit", form);
  }
};
</script>

<template>
<div class="m-5">
  <AppFlashMessage :error="errors"/>
  <form @submit.prevent="submit">
    <div class="grid lg:grid-cols-2 gap-4">
        <div class="block">
          <label class="block">Código del artículo</label>
          <span class="showSpan">
          {{ form.int_cod ? form.int_cod : "##########"}}
        </span>
        </div>        
        <div class="block">     
          <AppInput           
            v-model="form.name"
            label="Nombre del artículo"
            type="text"
            @blur="form.name = form.name.toUpperCase()"
            style="text-transform: uppercase;"
            :error="v$.name.$error ? v$.name.$errors[0].$message : null"
          />
        </div>        
        <div class="block">     
          <!--AppInput           
            v-model="form.photo"
            label="photo"
            type="hidden"
            :error="v$.photo.$error ? v$.photo.$errors[0].$message : null"
          /-->

          <GalleryImages v-if="form && form.photos"  :images="form.photos" :photoPaths="photoPaths"/>
        </div>
        <div class="block">
          <label class="block">Descripción</label>
          <span class="showSpan">
          {{ articleDescription }}
        </span>
        </div>        
        <div class="block">     
          <AppCheckbox
            v-model="form.status"
            label="status"
            :error="v$.photos.$error ? v$.photos.$errors[0].$message : null"
          />
        </div>        
      </div>
    
      <div class="mt-4 px-2 border-gray-100 flex justify-right space-x-2">
        <AppBtn
          type="submit"
          :text="pending ? 'Guardando...' : 'Guardar'"
          :isDisabled='pending'
        />
      </div>
  </form>
</div>
</template>

<style scoped>
.showSpan {
  @apply block p-2.5 border;
}
</style>

