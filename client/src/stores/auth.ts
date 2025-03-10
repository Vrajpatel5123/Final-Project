import { ref, computed } from 'vue'

interface User {
  name: string
  isAdmin: boolean
}

const user = ref<User | null>(null)
const isAuthenticated = ref(false)

export function useAuthStore() {
  const login = (userData: User) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  const isAdmin = computed(() => user.value?.isAdmin ?? false)

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout
  }
}