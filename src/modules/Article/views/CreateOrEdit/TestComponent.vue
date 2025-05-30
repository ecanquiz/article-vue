<script setup>
import { ref, onMounted } from 'vue';
import { Http as h } from "@/core/utils/Http";
import { productInit } from "@/core/utils/Http/init";

const Http = new h( productInit );

const imageUrls = [
  '/storage/Product/presentations/presentation-24/IywlRxqLKV6bMyV6tfUcuRpMJMIOa63cJU2QTgju.jpg',
  '/storage/Product/presentations/presentation-21/rgNKwkC4KnrJSABhaQkFqKH6rtvNFFD41Nk1uuyB.jpg',
  '/storage/Product/presentations/presentation-17/8P0bS3dks73SS8W8uId0HtNUzsUcDBn7iyrkO8mn.jpg'
];

const base64Images = ref([]);

async function convertImageToBase64(url) {
  const response = await Http.get(url);
  const blob = await response.blob();
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
src=""