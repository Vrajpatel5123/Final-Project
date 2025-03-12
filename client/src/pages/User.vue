<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useUsers } from '../composables/useUsers'

const { users, selectedUser } = useUsers()
const isLoggedIn = computed(() => selectedUser.value !== null)
const currentUser = computed(() => selectedUser.value)
</script>

<template>
  <div class="container">
    <h1 class="title">Users:</h1>
    <button class="button is-primary mb-4"><i class="fa-solid fa-plus"></i>Add User</button>
    
    <div class="columns" v-if="isLoggedIn">
      <div class="column is-8">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['tag', user.isAdmin ? 'is-success' : 'is-light']">
                  {{ user.isAdmin ? 'Admin' : 'User' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column is-4">
        <MyActivity v-if="currentUser" />
        <FriendsActivity v-if="currentUser" />
      </div>
    </div>
    
    <div v-else>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['tag', user.isAdmin ? 'is-success' : 'is-light']">
                {{ user.isAdmin ? 'Admin' : 'User' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
