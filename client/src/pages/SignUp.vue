<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as usersStore from '@/stores/users'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const { refreshUsers } = useUsers()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleSignUp = async (e: Event) => {
  e.preventDefault()
  
  // Simple validation
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill out all required fields'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  loading.value = true
  
  try {
    // Create new user
    const newUser = {
      name: name.value,
      email: email.value,
      isAdmin: false
    }
    
    const response = await usersStore.createUser(newUser)
    
    if (response.error) {
      errorMessage.value = response.error
    } else if (response.data) {
      // Refresh users list with new user
      await refreshUsers()
      
      // Show success and redirect to login
      alert('Account created successfully! Please log in.')
      router.push('/Login')
    } else {
      errorMessage.value = 'An unexpected error occurred'
    }
  } catch (error) {
    console.error('Sign up error:', error)
    errorMessage.value = 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signup-container">
    <form class="box signup-form" @submit="handleSignUp">
      <h1 class="title has-text-centered">Create Account</h1>
      
      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>
      
      <div class="field">
        <label class="label">Full Name</label>
        <div class="control has-icons-left">
          <input 
            v-model="name" 
            class="input" 
            type="text" 
            placeholder="e.g. Alex Smith" 
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input 
            v-model="email" 
            class="input" 
            type="email" 
            placeholder="e.g. alex@example.com" 
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input 
            v-model="password" 
            class="input" 
            type="password" 
            placeholder="Choose a secure password"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control has-icons-left">
          <input 
            v-model="confirmPassword" 
            class="input" 
            type="password" 
            placeholder="Type your password again"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <div class="control">
          <button 
            class="button is-primary is-fullwidth" 
            :class="{'is-loading': loading}"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
      
      <div class="has-text-centered mt-4">
        <p>
          Already have an account? 
          <router-link to="/Login" class="has-text-primary">Log in</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 3.25rem - 4rem); /* Full height minus navbar and padding */
  padding: 2rem;
}

.signup-form {
  width: 100%;
  max-width: 450px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: var(--card-bg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.signup-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.title {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.notification {
  margin-bottom: 1.5rem;
  border-radius: 6px;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.field:not(:last-child) {
  margin-bottom: 1.5rem;
}

.button.is-primary {
  transition: background 0.3s ease, transform 0.2s ease;
}

.button.is-primary:hover:not(.is-loading) {
  transform: translateY(-2px);
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
