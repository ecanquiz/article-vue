<script setup lang="ts">
import { ref } from 'vue';
import ModalShowPreview from './ModalShowPreview.vue';

const startOfImagePath: string = import.meta.env.VITE_PRODUCT_API_URL

const props = defineProps<{
  photoPaths: string[]
}>()

const previewImage = ref('')

const showPreview = (image: string) => {
  previewImage.value = `${startOfImagePath}/${image}`;
}

const closePreview = () => {
  previewImage.value = '';
}
</script>

<template>
  <div>
    <div class="image-container">
      <img v-for="(image, index) in props.photoPaths" 
        :key="index"
        :src="`${startOfImagePath}/${image}`"
        alt="Image" 
        @click="showPreview(image)"
      >
    </div>
    <ModalShowPreview
      v-if="previewImage"
      :previewImage="previewImage"
      @closePreview="closePreview"
    />
  </div>
</template>

<style>
  .image-container {
    display: flex;
    flex-wrap: wrap;
  }

  .image-container img {
    width: 200px;
    height: 200px;
    margin: 10px;
    cursor: pointer;
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
</style>