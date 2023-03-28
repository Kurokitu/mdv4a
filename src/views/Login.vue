<template>
    <n-card title="登录到Aqua">
        <n-input v-model:value="aimeNo" type="text" placeholder="Aime 卡号" style="margin-bottom: 0.5rem;" />
        <!-- <n-input :value="config.AQUA_URL" type="text" placeholder="Aqua 地址" style="margin-bottom: 0.5rem;" /> -->
        <n-button @click="login">登录</n-button>

        <p v-if="auth_state_tips" style="color: red">AimeID 不存在或错误</p>
    </n-card>
</template>

<script setup>
import { NCard, NInput, NButton } from 'naive-ui';
import { ref } from 'vue';
// import config from '../../public/config'
import auth from '../common/auth';
import { useRouter } from 'vue-router'

const router = useRouter()
const aimeNo = ref('')

const auth_state_tips = ref(false)

const login = async () => {
    console.log(aimeNo.value)
    await auth.login(aimeNo.value).then((res) => {
        console.log(res.data)
        localStorage.setItem("aimeId", res.data.extId);
        // console.log("Logged in as " + aimeId);
        router.push('/index')
    }).catch(() => {
        auth_state_tips.value = true
        console.log("NetWork Request Error.")
    })
    // location.reload()
}
</script>

<style scoped>
.n-button {
    float: right;
}
</style>