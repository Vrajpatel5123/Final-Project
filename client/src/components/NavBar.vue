<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const isActive = ref(false)
const { users, selectedUser, setSelectedUser } = useUsers()
</script>

<template>
  <!-- Nav Bar in Bulma -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          :class="{ 'is-active': isActive }"
          @click="isActive = !isActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item">
            <i class="fa-solid fa-house"></i>Home
          </RouterLink>

          <RouterLink to="/MyActivity" class="navbar-item">
            <i class="fa-solid fa-person-walking"></i>My Activity
          </RouterLink>

          <RouterLink to="/FriendActivity" class="navbar-item">
            <i class="fa-solid fa-users-rectangle"></i>Friends Activity
          </RouterLink>

          <RouterLink to="blank" class="navbar-item">
            <i class="fa-solid fa-magnifying-glass"></i>People Search
          </RouterLink>

          <div class="navbar-item has-dropdown is-hoverable">
            <RouterLink to="/Admin" class="navbar-link"> Admin </RouterLink>

            <div class="navbar-dropdown">
              <RouterLink to="/User" class="navbar-item"> User </RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink to="/SignUp" class="navbar-item"> Sign up </RouterLink>
              <div class="navbar-item has-dropdown is-hoverable">
                <RouterLink to="/Login" class="button is-primary">
                  <strong>Log in</strong>
                </RouterLink>

                <div class="navbar-dropdown">
                  <a 
                    v-for="user in users" 
                    :key="user.id"
                    class="navbar-item"
                    @click="setSelectedUser(user.id)"
                  >
                    {{ user.name }}
                    <span class="tag is-small ml-2" :class="user.isAdmin ? 'is-success' : 'is-info'">
                      {{ user.isAdmin ? 'Admin' : 'User' }}
                    </span>
                  </a>
                </div>
              </div>
              <RouterLink to="/" class="button is-primary" href="https://x.com/" target="_blank">
                Tweet X
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>
