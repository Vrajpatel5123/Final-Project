<script setup lang="ts">
import { useRoute } from 'vue-router'
</script>

<template>
    <form class="box">
        <h1 class="title">Sign Up</h1>
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
  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" placeholder="e.g. alex@example.com" />
    </div>
  </div>

  <button class="button is-primary">Sign in</button>
</form>
</template>

<style scoped>

</style>