<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import AddWorkout from './AddWorkout.vue'
import { useWorkouts } from '../composables/useWorkouts'

const isActive = ref(false)
const isModalActive = ref(false)
const isDrawerActive = ref(false)
const showAddForm = ref(false)
const router = useRouter()
const { users, selectedUser, setSelectedUser, logout } = useUsers()
const { workouts } = useWorkouts()

const isLoggedIn = computed(() => selectedUser.value !== null)
const isAdmin = computed(() => selectedUser.value?.isAdmin ?? false)

const handleNavigation = (path: string) => {
  if (!isLoggedIn.value) {
    alert('Please log in first')
    return
  }
  router.push(path)
}

const handleAdminAccess = () => {
  if (!isLoggedIn.value) {
    alert('Please log in first')
    return
  }
  if (!isAdmin.value) {
    alert('Admin access only')
    return
  }
  router.push('/User')
}

const handleLogout = () => {
  if (confirm('Are you sure you want to log out?')) {
    logout()
    router.push('/')
  }
}

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}

const toggleDrawer = () => {
  isDrawerActive.value = !isDrawerActive.value
}

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  isDrawerActive.value = true
}

const handleAddWorkout = () => {
  if (!isLoggedIn.value) {
    alert('Please log in first')
    return
  }
  toggleAddForm()
}
</script>

<template>
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

          <a class="navbar-item" @click="handleNavigation('/MyActivity')" :class="{ 'is-disabled': !isLoggedIn }">
            <i class="fa-solid fa-person-walking"></i>My Activity
          </a>

          <a class="navbar-item" @click="handleNavigation('/FriendActivity')" :class="{ 'is-disabled': !isLoggedIn }">
            <i class="fa-solid fa-users-rectangle"></i>Friends Activity
          </a>

          <a class="navbar-item">
            <i class="fa-solid fa-magnifying-glass"></i>People Search
          </a>

          <div class="navbar-item">
            <button 
              class="button" 
              @click="handleAddWorkout"
              :class="{ 'is-disabled': !isLoggedIn }"
            >
              <i class="fas fa-plus"></i>
              <span>Add</span>
            </button>
          </div>

          <div v-if="isAdmin" class="navbar-item has-dropdown is-hoverable">
            <RouterLink to="/Admin" class="navbar-link">Admin</RouterLink>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="handleAdminAccess">User</a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink v-if="!isLoggedIn" to="/SignUp" class="navbar-item"> Sign up </RouterLink>
              <div class="navbar-item has-dropdown is-hoverable">
                <RouterLink v-if="!isLoggedIn" to="/Login" class="button is-primary">
                  <strong>Log in</strong>
                </RouterLink>
                <span v-else class="button is-primary">
                  <strong>{{ selectedUser?.name }}</strong>
                </span>

                <div class="navbar-dropdown">
                  <template v-if="!isLoggedIn">
                    <a 
                      v-for="user in users" 
                      :key="user.id"
                      class="navbar-item"
                      @click="setSelectedUser(user.id)"
                    >
                      {{ user.name }}
                      <!-- <span class="tag is-small ml-2" :class="user.isAdmin ? 'is-success' : 'is-info'">
                        {{ user.isAdmin ? 'Admin' : 'User' }}
                      </span> -->
                    </a>
                  </template>
                  <a v-else class="navbar-item" @click="handleLogout">
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
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

  <div class="drawer" :class="{ 'is-active': isDrawerActive }">
    <div class="drawer-background" @click="toggleDrawer"></div>
    <div class="drawer-content">
      <button class="delete is-large close-button" @click="toggleDrawer"></button>
      
      <template v-if="showAddForm">
        <AddWorkout @close="toggleDrawer" />
      </template>
      <template v-else>
        <h2 class="title is-4">Recent Workouts</h2>
        <div class="workouts-list">
          <div class="card" v-for="(workout, index) in workouts" :key="index">
            <div class="card-content">
              <p class="title is-5">{{ workout.name }}</p>
              <div class="content">
                <p><strong>Date:</strong> {{ workout.date }}</p>
                <p><strong>Duration:</strong> {{ workout.duration }}</p>
                <p><strong>Location:</strong> {{ workout.location }}</p>
                <p><strong>Type:</strong> {{ workout.type }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  z-index: 1000;
}

.drawer.is-active {
  right: 0;
}

.drawer-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.drawer-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  background: #1a1a1a;
  padding: 2rem;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.drawer-content .card {
  margin-bottom: 1rem;
  background-color: #1a1a1a;
}

.drawer-content .title {
  color: white;
}
</style>
