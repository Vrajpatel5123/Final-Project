<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
    <header>
        <Navbar />
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style scoped>
main {
    min-height: calc(100vh - 3.25rem);
    background-color: black;
}
</style>
