<template>
    <n-card :title="title" size="medium">
        <n-avatar lazy :size="88" :src="image"></n-avatar>
        <div>
            <div>id: {{ record.musicId }}</div>
            <div>成绩: {{ record.achievement / 1e4 + "%" }}</div>
            <div>{{ record.userPlayDate }}</div>
            <div>等级: {{ record.level }}</div>
        </div>
    </n-card>
</template>

<style scoped>
.n-avatar {
    float: right;
}
</style>

<script setup>
import { computed } from 'vue';
import { NCard, NAvatar } from 'naive-ui';

const props = defineProps({
    record: {
        type: Object,
        required: true
    }
})
// console.log(props.record)

const title = computed(() => props.record.data?.title || 'NONAME')
const image = computed(() => {
    if (props.record.data) {
        return config.IMAGE_URL + props.record.data.image_url
    } else {
        return '/images/404.svg'
    }
})

</script>