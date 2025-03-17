<script setup lang="ts">
const props = defineProps<{
  isOpen?: boolean
}>()
</script>

<template>
  <div class="sliding-drawer" :class="{ open: props.isOpen }">
    <slot> </slot>
  </div>
</template>

<style scoped>
.sliding-drawer {
  position:fixed;
  top: -1;
  bottom: -1;
  right: 0;
  width: 30rem;
  background-color: black;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transform: translateX(29rem);
  transition: transform 0.3s ease-out;
}

.sliding-drawer.open,
.sliding-drawer:hover {
  transform: translateX(0rem);
}
</style>