<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { addNotification } from '../composables/notification'
import NotificationList from './NotificationList.vue'
import { getOne, type todo } from '@/stores/product'

interface Todo {
  id: number
  text: string
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
      text: newTodo.value
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
}
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered mt-4 mb-4">Todo List</h1>
    <div class="field">
      <div class="control">
        <input v-model="newTodo" @keyup.enter="addTodo" class="input" type="text" placeholder="Add a new todo" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button @click="addTodo" class="button is-primary">Add</button>
      </div>
    </div>
    <NotificationList />
    <div class="todos">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)" class="button is-danger is-small">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}

.todo-text {
  margin-right: 1rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
</style>