<template>
  <n-skeleton
    v-if="user_loading"
    width="100%"
    style="height: 240px"
    :sharp="false"
    size="medium"
  />
  <UserProfile :profile="profile" v-else />
  <br />
  <n-skeleton
    v-if="records_loading"
    width="100%"
    style="height: 200px"
    :sharp="false"
    size="medium"
    v-for="i in 20"
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
import axios from "axios";
import { GetUserProfile, GetUserRecent } from "../api";
import RecordCard from "../components/RecordCard.vue";
import UserProfile from "../components/UserProfile.vue";
import songdata from "../common/songdata";

const profile = ref({});
const page = ref(1);
const max_page = ref(41);
const size = ref(20);
const aimeId = parseInt(localStorage.getItem("aimeId"));

const records = ref({});

const user_loading = ref(true);
const records_loading = ref(true);

const putData = async (list) => {
  let item = [];
  list.forEach(async (data) => {
    item.push(Object.assign(data, await songdata(data.musicId)));
  });
  return item;
};

const getAll = () => {
  axios
    .all([
      GetUserProfile({
        aimeId,
      }),
      GetUserRecent({
        aimeId: aimeId,
        page: 0,
        size: size.value,
      }),
    ])
    .then(
      axios.spread(async (userdata, recent) => {
        profile.value = userdata.data;
        records.value = await putData(recent.data.content);
        page.value = recent.data.page + 1;
        max_page.value = recent.data.totalPages;

        user_loading.value = false;
        records_loading.value = false;
      })
    );
};

watch(page, (v) => {
  records_loading.value = true;

  GetUserRecent({
    aimeId: aimeId,
    page: v - 1,
    size: size.value,
  }).then(async (res) => {
    records.value = await putData(res.data.content);
    max_page.value = res.data.totalPages;
    records_loading.value = false;
  });
});

onMounted(() => {
  getAll();
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
