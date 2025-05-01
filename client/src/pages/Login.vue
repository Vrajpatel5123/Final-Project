<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
  <form class="box">
    <h1 class="title">Login</h1>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. alexsmith" />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="**********" />
      </div>
    </div>

    <button class="button is-primary">Login</button>
  </form>
</template>

<style scoped></style>
