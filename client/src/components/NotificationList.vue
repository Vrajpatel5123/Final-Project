<script setup lang="ts">
import { refNotification } from '../composables/notification'

const notifications = refNotification()
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="fade">
      <div v-for="(notification, index) in notifications" :key="index" 
           :class="['notification', `is-${notification.type}`]">
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notifications {
  margin: 1rem 0;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.notification {
  margin-bottom: 10px;
  padding: 1rem;
  border-radius: 4px;
  width: 100%;
  background-color: #48c78e;
  color: white;
}

.notification.is-success {
  background-color: #48c78e;
}
</style>
