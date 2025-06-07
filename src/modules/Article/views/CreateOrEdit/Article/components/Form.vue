<script setup lang="ts">
import { ref, inject } from "vue";
import IconCamera from "@/core/components/icons/IconCamera.vue"
import GalleryImages from "./GalleryImages/Index.vue";
import ModalImage from './ModalImage/Index.vue'
import useFormArticle from "../composables/useForm"
import type { Ref } from "vue";
import type { Article } from "@/modules/Article/types/Article";
import type { ImageType, Base64 } from "@/modules/Article/types/Image";

const articleDescription:Ref<string> = inject('article-description');

const { imagePaths, base64Images }: { imagePaths: Ref<string[]>, base64Images: Base64<ImageType>[] } = inject('image-paths');

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

////////////////////////////////////////////////////////////////////////////////
const imageUpload = (id: string) => {
//  presentationId.value=id.toString()
  isOpenModal.value = true
}
const isOpenModal = ref(false)
const presentationId = ref("")

const acceptModal= (f) => {  
  uploadFile(f)
}

const uploadFile = (file) => {
  /*const formData = new FormData();
  formData.append("file", file.files.image);

  PresentationService.uploadFilePresentation(formData, presentationId.value)
  .then((response) => {
    alert(response.data.message)
    emits("getPresentations")        
  })
  .catch((error) => console.log(error));
  */
}



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
        <div class="block box-content size-100 border-4 p-4">     
          <!--AppInput           
            v-model="form.photo"
            label="photo"
            type="hidden"
            :error="v$.photo.$error ? v$.photo.$errors[0].$message : null"
          /-->
          <div class="flex">
            <label>Imágenes</label>
            <IconCamera            
              class="ml-2 w-7 h-7 fill-current hover:cursor-pointer"
              @click="imageUpload('1')"
            />
          </div>

          <!--v-if="form && form.photos"-->

          <GalleryImages
            :images="form.photos"
            :imagePaths="imagePaths"
            :base64Images="base64Images"
          />
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
        <AppButton
          type="submit"
          :text="pending ? 'Guardando...' : 'Guardar'"
          :isDisabled='pending'
        />
      </div>
  </form>
  <ModalImage
    v-if="isOpenModal"
    :presentationId="presentationId"
    @closeModal="isOpenModal = false"
    @acceptModal="acceptModal"
  />
</div>
</template>

<style scoped>
.showSpan {
  @apply block p-2.5 border;
}
</style>

