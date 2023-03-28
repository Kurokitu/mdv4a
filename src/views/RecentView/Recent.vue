<template>
    <n-space vertical>
        <RecordCard v-for="(record, i) in records.content" :key="i" :record="record" />
        <n-pagination v-model:page="page" v-model:page-size="size" :page-count="records.totalPages" simple
            :on-update:page="getData" />
    </n-space>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { NSpace, NPagination } from 'naive-ui';
import songdata from '../../common/songdata.js';
import RecordCard from './RecordCard.vue';

import api from '../../api';

const page = ref(0)
const size = ref(20)
const aimeId = parseInt(localStorage.getItem('aimeId'))
const records = ref({})

const putData = () => {
    if (records.value.content) {
        records.value.content.forEach(record => {
            record.data = songdata.get(record.musicId)
        })
    }
    return records.value
}
const getData = () => {
    console.log(page.value)

    axios.get(api.recent, {
        params: {
            aimeId: aimeId,
            page: page.value,
            size: size.value
        }
    })
        .then(res => {
            console.log(res.data)
            records.value = res.data
            records.value = putData()
            // console.log(records.value.page)
            page.value = records.value.page + 1
        })
}
// console.log(songdata.get(834).title)
getData()
</script>

<style scoped>
.n-pagination {
    float: right;
}
</style>