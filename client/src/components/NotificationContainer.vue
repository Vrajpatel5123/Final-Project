<script setup lang="ts">
import { refNotification } from '../composables/notification'

const notification = refNotification();
</script>

<template>
  <div class="notification-container">
    <div v-for="notification in notification" :key="notification.message" 
         :class="['notification', `is-${notification.type}`]">
      {{ notification.message }}
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  margin-bottom: 10px;
  min-width: 200px;
}
</style>
