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
    left: 0;
    top: 0;
    background-color: transparent;
    border: solid;
    border-color: grey;
    border-width: 1px;
    padding: 10px;
  }

  .modal img {
    margin: auto;
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
</style>