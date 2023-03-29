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
  <Recent />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GetUserProfile } from "../api";
import UserProfile from "../components/UserProfile.vue";
import Recent from "./RecentView/Recent.vue";

const profile = ref({});
const aimeId = parseInt(localStorage.getItem("aimeId"));

const user_loading = ref(true);

onMounted(() => {
  GetUserProfile({
    aimeId,
  }).then((res) => {
    profile.value = res.data;
    user_loading.value = false;
  });
});
</script>
