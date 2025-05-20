<script setup lang="ts">
import { ref, watch } from 'vue';
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

watch(
  ()=> props.photoPaths[0],
  newValue => { showPreview(newValue) },
  { once: true }
)
</script>

<template>
  <div>
    <div class="image-container">
      <ModalShowPreview
        v-if="previewImage"
        :previewImage="previewImage"
        @closePreview="closePreview"
      />
      <img v-for="(image, index) in props.photoPaths" 
        :key="index"
        :src="`${startOfImagePath}/${image}`"
        alt="Image" 
        @click="showPreview(image)"
      >
    </div>

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