<template>
  <n-skeleton
    v-if="loading"
    width="100%"
    style="height: 200px"
    :sharp="false"
    size="medium"
    v-for="i in size"
    class="nscard"
  />
  <RecordCard v-else :record="records" />
  <div class="pagecount">
    <n-pagination
      v-model:page="page"
      v-model:page-size="size"
      :page-count="max_page"
      simple
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { GetUserRecent } from "../../api";
import songdata from "../../common/songdata";

const records = ref({});
const loading = ref(true);
const page = ref(1);
const max_page = ref(1);
const size = ref(20);
const aimeId = parseInt(localStorage.getItem("aimeId"));

const putData = async (list) => {
  let item = [];
  list.forEach(async (data) => {
    item.push(Object.assign(data, await songdata(data.musicId)));
  });
  return item;
};

watch(page, (v) => {
  loading.value = true;

  GetUserRecent({
    aimeId: aimeId,
    page: v - 1,
    size: size.value,
  }).then(async (res) => {
    records.value = await putData(res.data.content);
    max_page.value = res.data.totalPages;
    loading.value = false;
  });
});

onMounted(() => {
  GetUserRecent({
    aimeId: aimeId,
    size: size.value,
  }).then(async (res) => {
    records.value = await putData(res.data.content);
    max_page.value = res.data.totalPages;
    loading.value = false;
  });
});
</script>

<style>
.nscard + .nscard {
  margin-top: 10px;
}

.pagecount {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
</style>
