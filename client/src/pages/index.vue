<script setup lang="ts">
import { useRoute } from 'vue-router';
</script>

<template>
    <section class="section">
    <div class="container">
      <h1 class="title">Welcome to the Fitness Tracker App</h1>
      <p class="subtitle">Track your exercises, monitor your progress, and stay connected with friends!</p>

      <div class="buttons">
        <RouterLink to="/Login" class="button is-primary">Login and start the progress!</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>