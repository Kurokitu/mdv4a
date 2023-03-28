<template>
    <UserProfile :profile="profile" />
    <br>
    <Recent />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import api from '../api/index.js';
import Recent from './RecentView/Recent.vue';
import UserProfile from './UserProfile.vue';
import auth from '../common/auth';

const profile = ref({})
const aimeId = parseInt(localStorage.getItem('aimeId'))

const getAll = () => {
    axios.all([
        axios.get(api.profile, {
            params: {
                aimeId: aimeId
            }
        })
    ])
        .then(axios.spread((userdata, recent) => {
            console.log(userdata.data)

            profile.value = userdata.data
        }))
}

if (auth.isLoggedIn()) {
    getAll()
}
</script>