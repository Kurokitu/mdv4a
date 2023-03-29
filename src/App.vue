<template>
  <n-spin class="loading" :show="show">
    <router-view></router-view>
  </n-spin>
  <Footer />
</template>

<script setup>
import { onMounted } from "vue";
import Footer from "./components/Footer.vue";

const show = ref(true);

onMounted(() => {
  show.value = false;
});
</script>

<style>
.loading {
  min-height: 600px;
}
</style>
