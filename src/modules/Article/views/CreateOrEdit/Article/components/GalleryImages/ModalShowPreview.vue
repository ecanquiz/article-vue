<script setup lang="ts">
// https://primevue.org/galleria/
// https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_gallery
const props = defineProps<{
  previewImage: string
}>()

const emit = defineEmits<{
  (e: 'closePreview'): void
}>()

const closePreview = () => emit("closePreview");
</script>

<template>
  <div class="modal">
    <!--span
      class="close" 
      @click="closePreview"
    >
      &times;
    </span-->
    <img :src="previewImage" alt="Preview">
  </div>
</template>

<style scoped>
  .modal {
    /*display: block;
    position: fixed;
    z-index: 1000;*/
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    /*background-color: rgba(0, 0, 0, 0.8);*/
    background-color: rgba(0, 0, 0, 0);

  }

  .modal img {
    margin: auto;
    display: block;
    max-width: 50%;
    max-height: 50%;
  }
</style>