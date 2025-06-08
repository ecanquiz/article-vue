<script setup lang="ts">
import { ref, inject } from "vue";
import IconUploadFile from "./Icons/UploadFile.vue"
import type { ImageType,  Base64} from "@/modules/Article/types/Image";

const props = defineProps<{ presentationId: string }>()

const {
  base64Images,
  addImagePath,
}: {
  base64Images: Base64<ImageType>[],
  addImagePath: (articleDetail: string) => void,
} = inject('image-paths');

const image = ref({
  preview: null,
  image: null
})

const emits = defineEmits<{
  (e: 'closeModal'): void  
  (e: 'acceptModal', payload: any): void
//  (e: 'acceptModal', payload: Packing): void
}>()

const closeModal = () => {
  emits('closeModal')
}

const submit = () => {

  //console.log(image.value)

  if (true) {
    //emits('acceptModal', {
    //  presentationId: props.presentationId,
    //  files: image.value
    //})
    //base64Images.value.push(image.value.preview as any as Base64<ImageType>)
    addImagePath(image.value.preview as any as Base64<ImageType>) 
    closeModal()    
  }
}

const filelist = ref([]) // Store our uploaded files

const file = ref(null);

const onChange = () => {
  if(file.value) {
    const reader = new FileReader()
    reader.onload = e => image.value.preview = e.target.result    
    reader.readAsDataURL(file.value.files[0])
    image.value.image = file.value.files[0]    
    // filelist.value = [...file.value.files];
    filelist.value = [file.value.files[0]]
  }  
}

const remove = (i) => {
  filelist.value.splice(i, 1);
  image.value.preview = null
  image.value.image = null
}

const dragover = (event) => {
  event.preventDefault();
  // Add some visual fluff to show the user can drop its files
  if (!event.currentTarget.classList.contains('bg-base-100')) {
    event.currentTarget.classList.add('bg-base-100');
    event.currentTarget.classList.remove('bg-base-200');    
  }
}

const dragleave = (event) => {
  // Clean up  
  event.currentTarget.classList.remove('bg-base-100');
  event.currentTarget.classList.add('bg-base-200');
}

const drop = (event) => {
  event.preventDefault();  
  file.value.files = event.dataTransfer.files;
  onChange(); // Trigger the onChange event manually
  // Clean up
  event.currentTarget.classList.add('bg-base-200');
  event.currentTarget.classList.remove('bg-base-100');
}
</script>

<template>
<Teleport to="body">
  <Transition mode="in-out">
    <div class="modal transition duration-150 v-enter-active">
      <div class="modal-content rounded-lg shadow-xl bg-base-200">
        <span class="close" @click="closeModal">&times;</span>
        <h1 class="text-xl font-semibold mb-4">Subir Imagen</h1> 
        <form @submit.prevent="submit">
        <div class="flex w-full h-auto items-center justify-center text-center" v-if="!image.preview">       
          <div
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            class="p-12 bg-base-200 border border-gray-300 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <input
              type="file"
              name="fields[assetsFieldHandle][]"
              id="assetsFieldHandle" 
              class="w-px h-px opacity-0 overflow-hidden absolute"
              @change="onChange"
              ref="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />  
            <label for="assetsFieldHandle" class="block cursor-pointer">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <IconUploadFile />
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Haga clic para cargar</span> o arrastrar y soltar
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            </label>
          </div>
        </div>
        <div
          class="border p-2 w-56 m-auto items-center justify-center text-center" v-if="image.preview"
        >
          <img :src="image.preview" class="img-fluid"/>
          <ul class="mt-4" v-if="filelist.length" v-cloak>
            <li class="text-sm p-1" v-for="file in filelist">
              {{ file.name }}
              <!--AppButton class="btn btn-danger" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</AppButton-->
            </li>
          </ul>
        </div>
        <div
          v-if="filelist.length>0"
          class="flex items-center justify-between mt-4"          
        >
          <AppButton
            type="submit"                               
            data-testid="submit-btn"
            class="btn btn-primary"
            text="Guardar"
          />
           <AppButton
             type="button"
             @click="remove(filelist.indexOf(file))"
             data-testid="remove-btn"
             class="btn btn-danger"             
             text="Remover"
           />
        </div>
        </form> 
      </div>
    </div>
  </Transition>
</Teleport>
</template>

<style scoped>
.modal {  
  @apply fixed z-50 pt-28; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  
}

.modal-content {
  @apply m-auto w-4/5 sm:w-9/12 md:w-4/6 lg:w-3/6;
  padding: 20px;
  border: 1px solid #888;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-10vw);
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

[v-cloak] {
  display: none;
}
</style>