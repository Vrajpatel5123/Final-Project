import { ref } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export function useUsers() {
  const users = ref([
    { id: 1, name: 'Tommy', email: 'emily@example.com', isAdmin: false },
    { id: 2, name: 'Tommy', email: 'tommy@example.com', isAdmin: false },
    { id: 3, name: 'Elijah', email: 'elijah@example.com', isAdmin: false },
    { id: 4, name: "Jessica", email: "jessica@example.com", isAdmin: false},
    { id: 5, name: "Tony", email: "tony@example.com", isAdmin: true},
    { id: 6, name: "Lexy", email: "lexy@example.com", isAdmin: false},
  ])

  const selectedUser = ref<User | null>(null)

  const setSelectedUser = (userId: number) => {
    const user = users.value.find(u => u.id === userId)
    selectedUser.value = user || null
  }

  const logout = () => {
    selectedUser.value = null
  }

  return {
    users,
    selectedUser,
    setSelectedUser,
    logout
  }
}
