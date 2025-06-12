<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import ModalShowPreview from './ModalShowPreview.vue';
import type { Images, ImageType, Base64 } from "@/modules/Article/types/Image";
import AppButton from '@/core/components/AppButton.vue';

const props = defineProps<{
  images: Images
}>()

const {
  removeImagePath,
  removeAllImagePaths
}: {
  removeImagePath: (index: number) => void,
  removeAllImagePaths: () => void
} = inject('image-paths');

const selectImage = ref('')

const previewImage = ref('')

const showPreview = (image: Base64<ImageType>) => {
  selectImage.value = image;
  previewImage.value = image;
}

const closePreview = () => {
  selectImage.value = '';
  previewImage.value = '';
}

watch(
  ()=> props.images.base64[0],
  newValue => { showPreview(newValue) },
  // { once: true }
)

const classImages = (index: number) =>
  props.images.base64[index] === selectImage.value
    ? 'image-selected'
    : 'image-unselected'

const removeImage = (index: number) => {
  removeImagePath(index);
  showPreview(props.images.base64[0]);
}
</script>

<template>
  <div class="">
    <ModalShowPreview
      v-if="previewImage"
      :previewImage="previewImage"
      @closePreview="closePreview"
    />
    <div class="image-container">
      <div
        :class="classImages(index)"
        v-for="(image, index)  in props.images.base64"
        :key="index"
      >
        <img          
          :src="image"
          alt="Image" 
          @click="showPreview(image)"
          @dblclick="removeImage(index)"
        />
      </div>
    </div>
    <AppButton
      v-if="props.images.base64.length"
      type="button"
      text="Eliminar todas"
      class="btn btn-danger"
      @click="removeAllImagePaths()"
    />
  </div>
</template>

<style scoped>
  .image-container {
    display: flex;
    flex-wrap: wrap;
  }

  .image-container img {
    width: 100px;
    height: 100px;
    margin: 10px;
    cursor: pointer;
  }

  .image-selected {
    opacity: 1;
    background-color: grey;
    margin: 5px;
  }

  .image-unselected {
    opacity: 0.33;
    background-color: grey;
    margin: 5px;
  }

  .close {
    color: #fff;
    position: absolute;
    top: 15px;
    right: 35px;
    font-size: 30px;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: #ccc;
    text-decoration: none;
    cursor: pointer;
  }

      /* Next & previous buttons */
/*.prev, .next {
  top: -200;
  cursor: pointer;
  position: relative;
  width: auto;
  margin: auto;
  padding: 16px;
  color: black;  
  transition: 0.6s ease;
  border-radius: 3px;
  user-select: none;
}*/

/* On hover, add a black background color with a little bit see-through */
/*.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}*/
</style>