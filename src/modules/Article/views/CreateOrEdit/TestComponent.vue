<!--script setup>
import { ref, onMounted } from 'vue';
import { productInit } from "@/core/utils/Http/init";
import axios from "axios";

const imageUrls = [
  'Product/presentations/presentation-24/IywlRxqLKV6bMyV6tfUcuRpMJMIOa63cJU2QTgju.jpg',
  'Product/presentations/presentation-21/rgNKwkC4KnrJSABhaQkFqKH6rtvNFFD41Nk1uuyB.jpg',
  'Product/presentations/presentation-17/8P0bS3dks73SS8W8uId0HtNUzsUcDBn7iyrkO8mn.jpg'
];

const base64Images = ref([]);

async function convertImageToBase64(url) {
  const client = axios.create(productInit);
  //const response = await Http.get(`api/public-file/${url}`);

  const response = await client.get(`api/public-file/${url}`, {
    responseType: 'blob', // Importante para imágenes
  });

  const blob = await response.data;
  console.log(blob)
  const reader = new FileReader();
 

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function convertImages() {
  const promises = imageUrls.map(url => convertImageToBase64(url));
  base64Images.value = await Promise.all(promises);
}

onMounted(() => {
  convertImages();
});
</script-->


<script setup>
import { ref, onMounted } from 'vue';
import { Http as h } from "@/core/utils/Http";
import { productInit } from "@/core/utils/Http/init";

const Http = new h( productInit );

const imageUrls = [
  'Product/presentations/presentation-24/IywlRxqLKV6bMyV6tfUcuRpMJMIOa63cJU2QTgju.jpg',
  'Product/presentations/presentation-21/rgNKwkC4KnrJSABhaQkFqKH6rtvNFFD41Nk1uuyB.jpg',
  'Product/presentations/presentation-17/8P0bS3dks73SS8W8uId0HtNUzsUcDBn7iyrkO8mn.jpg'
];

const base64Images = ref([]);

async function convertImageToBase64(url) {
  const response = await Http.get(`api/public-file/${url}`, "blob");
  const blob = await response.data;
  console.log(blob)
  const reader = new FileReader();
 

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function convertImages() {
  const promises = imageUrls.map(url => convertImageToBase64(url));
  base64Images.value = await Promise.all(promises);
}

onMounted(() => {
  convertImages();
});
</script>

<template>
  <div>
    {{ base64Images }}
  </div>
</template>