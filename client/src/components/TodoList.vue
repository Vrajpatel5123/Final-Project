<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { addNotification } from '../composables/notification'
import NotificationList from './NotificationList.vue'
import { getOne, type todo } from '@/stores/product'

interface Todo {
  id: number
  text: string
  completed?: boolean
}

const route = useRoute()
const newTodo = ref('')
const todos = ref<Todo[]>([])
const Todo = ref<todo>();

getOne(String((route.params as { id: number }).id)).then((response) =>{
  Todo.value = response;
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    })
    addNotification({
      message: 'Todo created successfully!',
      type: 'success'
    })
    newTodo.value = ''
  }
}

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  addNotification({
    message: 'Todo deleted successfully!',
    type: 'info'
  })
}

const toggleComplete = (id: number) => {
  const todoIndex = todos.value.findIndex(todo => todo.id === id)
  if (todoIndex !== -1) {
    todos.value[todoIndex].completed = !todos.value[todoIndex].completed
    
    addNotification({
      message: todos.value[todoIndex].completed ? 'Todo marked as completed!' : 'Todo marked as incomplete!',
      type: 'success'
    })
  }
}
</script>

<template>
  <div class="todo-container">
    <div class="card todo-card">
      <div class="card-header">
        <h1 class="card-header-title">
          <span class="icon mr-2">
            <i class="fas fa-tasks"></i>
          </span>
          My Todo List
        </h1>
      </div>
      
      <div class="card-content">
        <NotificationList />
        
        <div class="field has-addons">
          <div class="control is-expanded">
            <input 
              v-model="newTodo" 
              @keyup.enter="addTodo" 
              class="input" 
              type="text" 
              placeholder="What needs to be done?" 
            />
          </div>
          <div class="control">
            <button @click="addTodo" class="button is-primary">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add</span>
            </button>
          </div>
        </div>
        
        <div class="todos-list">
          <div v-if="todos.length === 0" class="empty-state">
            <p class="has-text-centered">
              <span class="icon is-large">
                <i class="fas fa-clipboard-list fa-2x"></i>
              </span>
            </p>
            <p class="has-text-centered mt-3">No todos yet. Add your first task!</p>
          </div>
          
          <transition-group name="todo-list" tag="div">
            <div 
              v-for="todo in todos" 
              :key="todo.id" 
              class="todo-item" 
              :class="{'completed': todo.completed}"
            >
              <div class="todo-content">
                <button 
                  class="todo-check-button" 
                  @click="toggleComplete(todo.id)"
                  :class="{'is-checked': todo.completed}"
                >
                  <span class="icon">
                    <i class="fas" :class="todo.completed ? 'fa-check-circle' : 'fa-circle'"></i>
                  </span>
                </button>
                <span class="todo-text">{{ todo.text }}</span>
              </div>
              <div class="todo-actions">
                <button @click="deleteTodo(todo.id)" class="delete-button" aria-label="delete todo">
                  <span class="icon">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.todo-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card-header {
  background-color: var(--accent);
  padding: 0.75rem;
}

.card-header-title {
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
}

.todos-list {
  margin-top: 1.5rem;
}

.empty-state {
  padding: 2rem 0;
  color: var(--text-secondary);
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.todo-check-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.todo-check-button:hover {
  transform: scale(1.2);
}

.todo-check-button.is-checked {
  color: #48c774;
}

.todo-text {
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.completed .todo-text {
  text-decoration: line-through;
  opacity: 0.7;
}

.todo-actions {
  display: flex;
  align-items: center;
}

.delete-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.delete-button:hover {
  color: #ff3860;
  transform: rotate(4deg) scale(1.1);
}

/* Animations */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.5s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>