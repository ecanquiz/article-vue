<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import ModalShowPreview from './ModalShowPreview.vue';

const startOfImagePath: string = import.meta.env.VITE_PRODUCT_API_URL

const props = defineProps<{
  photoPaths: string[]
}>()

const selectImage = ref('')

const previewImage = ref('')

const showPreview = (image: string) => {
  selectImage.value = image;
  previewImage.value = `${startOfImagePath}/${image}`;
}

const closePreview = () => {
  selectImage.value = '';
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




    <ModalShowPreview
      v-if="previewImage"
      :previewImage="previewImage"
      @closePreview="closePreview"
    />
    <div class="image-container">
                  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>

      <div
        :class="props.photoPaths[index] === selectImage ? 'image-selected' : 'image-unselected'"
        v-for="(image, index)  in props.photoPaths"
        :key="index"
      >
        <img          
          :src="`${startOfImagePath}/${image}`"
          alt="Image" 
          @click="showPreview(image)"
        />

      </div>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>

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
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: black;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}
</style>