<template>
    <n-card :bordered="false" content-style="padding: 0;">
        <p>Made by <a href="https://github.com/realzns">@realZnS</a> with love.</p>
    </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui';
</script>

<style scoped>
.n-card {
    background-color: transparent;
    text-align: center;
}

.n-card a {
    text-decoration: none;
    font-weight: bold;
    color: #00000088;
    transition: 1s;
}

.n-card a:hover {
    color: blueviolet;
}
</style>