import { ref, computed, provide, inject, type InjectionKey, type ComputedRef } from 'vue';

interface SessionStore {
  user: any;
  isAuthenticated: ComputedRef<boolean>;
  setUser: (newUser: any) => void;
  logout: () => void;
}

const SessionKey: InjectionKey<SessionStore> = Symbol('session');

export function createSessionStore() {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  function setUser(newUser: any) {
    user.value = newUser;
  }

  function logout() {
    user.value = null;
  }

  const store = {
    user,
    isAuthenticated,
    setUser,
    logout
  };

  provide(SessionKey, store);
  return store;
}

export function useSessionStore(): SessionStore {
  const store = inject(SessionKey);
  if (!store) throw new Error('Session store not provided');
  return store;
}

// Usage example (in components):
// const { user, isAuthenticated, setUser, logout } = useSessionStore();
