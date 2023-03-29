<template>
  <n-card
    v-for="(v, i) in record"
    :key="i"
    :title="v.title && v.title !== '' ? v.title : 'NONAME'"
    size="medium"
    class="ncard"
  >
    <n-avatar
      lazy
      :size="88"
      :src="
        v.image_url && v.image_url !== ''
          ? img_base_url + v.image_url
          : '/images/404.svg'
      "
    ></n-avatar>
    <div>
      <div>id: {{ v.musicId }}</div>
      <div>成绩: {{ v.achievement / 1e4 + "%" }}</div>
      <div>{{ v.userPlayDate }}</div>
      <div>等级: {{ v.level }}</div>
    </div>
  </n-card>
</template>

<style scoped>
.n-avatar {
  float: right;
}

.ncard + .ncard {
  margin-top: 10px;
}
</style>

<script setup>
const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
});

const img_base_url = config.IMAGE_URL;
</script>
