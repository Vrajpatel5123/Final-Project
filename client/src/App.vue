<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SlidingDrawer from './components/SlidingDrawer.vue';
import AddWorkout from './components/AddWorkout.vue';
import NotificationList from './components/NotificationList.vue';
import { useUsers } from './composables/useUsers';

const isDarkMode = ref(true) // Default to dark mode

// Load theme preference from localStorage on component mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDarkMode.value = savedTheme ? savedTheme === 'dark' : true
  applyTheme()
})

// Watch for theme changes and update localStorage and apply theme
watch(isDarkMode, () => {
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  applyTheme()
})

// Apply the theme to the document body
const applyTheme = () => {
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  document.body.classList.toggle('light-mode', !isDarkMode.value)
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div :class="{'dark-mode': isDarkMode, 'light-mode': !isDarkMode}">
    <header>
      <NavBar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    </header>

    <main>
      <RouterView />
    </main>

    <SlidingDrawer>
      <AddWorkout />
    </SlidingDrawer>
    
    <!-- Notifications -->
    <NotificationList />
  </div>
</template>

<style>
/* Global styles */
:root {
  --bg-primary: #f5f5f5;
  --bg-secondary: #ffffff;
  --text-primary: #363636;
  --text-secondary: #4a4a4a;
  --text-muted: #777777;
  --accent: #485fc7;
  --accent-color: #485fc7;
  --accent-color-light: rgba(72, 95, 199, 0.15);
  --border-color: #dbdbdb;
  --border-light: #e0e0e0;
  --card-bg: #ffffff;
  --navbar-bg: #ffffff;
  --drawer-bg: #f5f5f5;
  --button-hover: #f0f0f0;
  --background-alt: #f9f9f9;
  --background-hover: #f2f2f2;
  --danger: #ff3860;
  --danger-light: rgba(255, 56, 96, 0.1);
}

.dark-mode {
  --bg-primary: #121212;
  --bg-secondary: #1a1a1a;
  --text-primary: #f5f5f5;
  --text-secondary: #dbdbdb;
  --text-muted: #a0a0a0;
  --accent: #5e72e4;
  --accent-color: #5e72e4;
  --accent-color-light: rgba(94, 114, 228, 0.15);
  --border-color: #2c2c2c;
  --border-light: #2a2a2a;
  --card-bg: #1e1e1e;
  --navbar-bg: #1a1a1a;
  --drawer-bg: #1e1e1e;
  --button-hover: #2c2c2c;
  --background-alt: #222222;
  --background-hover: #2a2a2a;
  --danger: #ff3860;
  --danger-light: rgba(255, 56, 96, 0.1);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  min-height: calc(100vh - 3.25rem);
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease;
}

.button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
