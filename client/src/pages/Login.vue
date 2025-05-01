<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const route = useRoute()
const { users, setSelectedUser, isLoading, refreshUsers } = useUsers()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

// Refresh users when component mounts
onMounted(() => {
  refreshUsers()
})

const handleLogin = async (e: Event) => {
  e.preventDefault()
  
  // Simple validation
  if (!username.value) {
    errorMessage.value = 'Please enter your username/email'
    return
  }
  
  loading.value = true
  
  try {
    // Find user by email (username in this simple implementation)
    const user = users.value.find(u => 
      u.email.toLowerCase() === username.value.toLowerCase() ||
      u.name.toLowerCase() === username.value.toLowerCase()
    )
    
    if (user) {
      // In a real app, we would validate password here
      // For now, we just set the user as logged in
      setSelectedUser(user.id)
      
      // Redirect to redirectUrl or home
      const redirectUrl = route.query.redirectUrl as string || '/'
      router.push(redirectUrl)
    } else {
      errorMessage.value = 'User not found. Please check your username/email.'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'An error occurred during login. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <form class="box login-form" @submit="handleLogin">
      <h1 class="title has-text-centered">Login</h1>
      
      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>
      
      <div class="field">
        <label class="label">Username or Email</label>
        <div class="control has-icons-left">
          <input 
            v-model="username" 
            class="input" 
            type="text" 
            placeholder="e.g. alexsmith or alex@example.com" 
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
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
            placeholder="**********"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p class="help">For demo purposes, any password will work</p>
      </div>
      
      <div class="field">
        <div class="control">
          <button 
            class="button is-primary is-fullwidth" 
            :class="{'is-loading': loading}"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
      
      <div class="has-text-centered mt-4">
        <p>
          Don't have an account? 
          <router-link to="/SignUp" class="has-text-primary">Sign up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 3.25rem - 4rem); /* Full height minus navbar and padding */
  padding: 2rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: var(--card-bg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form:hover {
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
