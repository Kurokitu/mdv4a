<template>
    <n-card :title="profile.userName">
        <div style="width: 200px;">
            <div>pc: {{ profile.playCount }}</div>
            <div>rating: {{ profile.playerRating }}</div>
        </div>
        <n-button @click="showDetail = true">详情</n-button>
        <n-button @click="logout" style="margin-right: 0.5rem;">退出登录</n-button>
        <n-modal style="width: 600px" v-model:show="showDetail" preset="card" :auto-focus=false>
            <n-input :value="JSON.stringify(profile)" type="textarea" :autosize="{ minRows: 8 }" />
            <template #footer>
                <n-button @click="copyToClipboard(JSON.stringify(profile))">复制</n-button>
            </template>
        </n-modal>
    </n-card>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import auth from '../common/auth'
import { NCard, NButton, NModal, NInput } from 'naive-ui'

import { useRouter } from 'vue-router'

const router = useRouter()

const copyToClipboard = (p) => {
    navigator.clipboard.writeText(p)
}
const showDetail = ref(false)

const props = defineProps({
    profile: {
        type: Object,
        required: true,
    }
})

const logout = () => {
    auth.logout()
    router.push('/')
}
</script>

<style scoped>
.n-button {
    float: right;
}
</style>