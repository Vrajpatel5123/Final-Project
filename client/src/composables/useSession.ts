import { ref, readonly } from 'vue';

const user = ref(null);
const isAuthenticated = ref(false);

export function useSession() {
  function setUser(newUser: any) {
    user.value = newUser;
    isAuthenticated.value = !!newUser;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    setUser,
    logout
  };
}
