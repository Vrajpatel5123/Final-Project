<script setup lang="ts">

import {get, getAll, type User} from '@/stores/users'
import { ref , onMounted} from 'vue';
import { isLoggedIn, login, logout, refSession } from '@/composables/session';

const users = ref<User[]>([])

onMounted(() => {
    getAll().then((response) => {
        users.value = response.items
    })
})

getAll().then((response) => {
    users.value = response.items
})

const session = refSession()

</script>

<template>
    <div class="buttons" v-if="!isLoggedIn()">
         <a class="button is-primary">
             <strong>Sign up</strong>
         </a>
 
         <div class="navbar-item has-dropdown is-hoverable">
             <a class="button is-light">
                 Log in
             </a>
 
             <div class="navbar-dropdown">
                 <a class="navbar-item" v-for="user in users" :key="user.id" @click="login(user.id)">
                     {{ user.name }} 
                 </a>
             </div>
         </div>
     </div>
    
     <div class="buttons" v-else>
        <a class="button is-light" @click="logout()">
            Log out
        </a>
        <span>{{ session?.user?.name }}</span>
     </div>
</template>

<style scoped>

</style>