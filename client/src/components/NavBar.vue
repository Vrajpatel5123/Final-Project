<script setup lang="ts">

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const auth = useAuthStore()
const isMenuActive = ref(false)

function toggleMenu() {
    isMenuActive.value = !isMenuActive.value
}

function handleLogout() {
    auth.logout()
}
</script>

<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                Workout Tracker
            </RouterLink>

            <a role="button" 
               class="navbar-burger" 
               :class="{ 'is-active': isMenuActive }" 
               @click="toggleMenu"
               aria-label="menu" 
               aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">My Activity</RouterLink>
                <RouterLink class="navbar-item" to="/friends">Friend Activity</RouterLink>
                <RouterLink v-if="auth.isAdmin" class="navbar-item" to="/admin/users">
                    Manage Users
                </RouterLink>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <template v-if="auth.isAuthenticated">
                            <span class="navbar-item">Welcome, {{ auth.user?.value?.name }}</span>
                            <a class="button is-light" @click="handleLogout">
                                Log out
                            </a>
                        </template>
                        <template v-else>
                            <RouterLink class="button is-primary" to="/login">
                                Log in
                            </RouterLink>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    margin-bottom: 2rem;
}

.navbar-item {
    color: white;
}

.button.is-primary {
    background-color: #485fc7;
}
</style>