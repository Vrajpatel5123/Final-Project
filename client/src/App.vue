<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'  // Updated to use @ alias
</script>

<template>
    <header>
        <NavBar />
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
