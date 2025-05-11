<script setup lang="ts">
import { ref } from 'vue';

const previewImage = ref('')
const images = ref([])

images.value = [
  'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190718150152/Java-tutorials-by-GeeksForGeeks.png',
  'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210713211702/System-Design-Tutorial.png',
  'https://media.geeksforgeeks.org/wp-content/uploads/20240304152903/python-tutorial-2.webp'
]

const showPreview = (image) => {
  previewImage.value = image;
}

const closePreview = () => {
  previewImage.value = '';
}

</script>

<template>
  <div>
    <!--h1>Image Gallery App</h1-->
    <div class="image-container">
      <img v-for="(image, index) in images" 
        :key="index"
        :src="image"
        alt="Image" 
        @click="showPreview(image)"
      >
    </div>
    <div class="modal" v-if="previewImage">
      <span
        class="close" 
        @click="closePreview">
        &times;
      </span>
      <img :src="previewImage" alt="Preview">
    </div>
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

  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal img {
    margin: auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
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