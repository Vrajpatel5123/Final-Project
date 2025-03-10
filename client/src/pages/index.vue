<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSession } from '@/composables/useSession';

const router = useRouter();
const { user } = useSession();
const isLoading = ref(true);

onMounted(() => {
  if (user.value) {
    router.push('/dashboard');
  }
  isLoading.value = false;
});
</script>

<template>
  <section class="section">
    <div class="container" v-if="!isLoading">
      <h1 class="title">Welcome to the Fitness Tracker App</h1>
      <p class="subtitle">Track your exercises, monitor your progress, and stay connected with friends!</p>

      <div class="content">
        <p>To access the fitness tracker and connect with friends, please log in:</p>
        <div class="buttons">
          <RouterLink to="/login" class="button is-primary">Login</RouterLink>
          <RouterLink to="/register" class="button is-info">Register</RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="container has-text-centered">
      <progress class="progress is-primary" max="100">Loading...</progress>
    </div>
  </section>
</template>

<style scoped>
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 600px;
  text-align: center;
}

.buttons {
  margin-top: 2rem;
  justify-content: center;
}
</style>