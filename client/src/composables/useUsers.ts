import { ref } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export function useUsers() {
  const users = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', isAdmin: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', isAdmin: false },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', isAdmin: false }
  ])

  const selectedUser = ref<User | null>(null)

  const setSelectedUser = (userId: number) => {
    selectedUser.value = users.value.find(user => user.id === userId) || null
  }

  return {
    users,
    selectedUser,
    setSelectedUser
  }
}
