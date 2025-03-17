<script setup lang="ts">
import { ref } from 'vue'
import { useWorkouts } from '../composables/useWorkouts'

const { addWorkout } = useWorkouts()

const emit = defineEmits(['close'])

const workoutName = ref('')
const workoutDate = ref('')
const workoutDuration = ref('')
const workoutLocation = ref('')
const workoutType = ref('select-workout')
const statusMsg = ref('')
const errorMsg = ref('')
const isModalActive = ref(false)

interface Workout {
  name: string
  duration: string
  date: string
  location: string
  type: string
}

function toggleModal() {
  emit('close')
}

function handleAddWorkout() {
  if (workoutName.value && workoutDuration.value && workoutDate.value) {
    addWorkout({
      name: workoutName.value,
      duration: workoutDuration.value,
      date: workoutDate.value,
      location: workoutLocation.value,
      type: workoutType.value,
    })
    workoutName.value = ''
    workoutDuration.value = ''
    workoutDate.value = ''
    workoutLocation.value = ''
    workoutType.value = 'select-workout'
    statusMsg.value = 'Workout added successfully!'
    toggleModal()
  } else {
    errorMsg.value = 'Please fill in all required fields'
  }
}
</script>

<template>
  <form class="box" @submit.prevent="handleAddWorkout">
    <h1 class="title">Add Workout</h1>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" v-model="workoutName" placeholder="Enter workout title" />
      </div>
    </div>

    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <input class="input" type="date" v-model="workoutDate" />
      </div>
    </div>

    <div class="field">
      <label class="label">Duration</label>
      <div class="control">
        <input class="input" type="text" v-model="workoutDuration" placeholder="Enter duration" />
      </div>
    </div>

    <div class="field">
      <label class="label">Location</label>
      <div class="control">
        <input class="input" type="text" v-model="workoutLocation" placeholder="Enter location" />
      </div>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <select class="input" v-model="workoutType">
          <option value="select-workout">Select workout type</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>
    </div>

    <div v-if="errorMsg" class="notification is-danger">{{ errorMsg }}</div>
    <div v-if="statusMsg" class="notification is-success">{{ statusMsg }}</div>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-primary">Save</button>
      </div>
      <div class="control">
        <button type="button" class="button" @click="toggleModal">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.box {
  margin: 0;
  background-color: #1a1a1a;
  color: white;
}

/* Dark theme styles */
.title {
  color: white;
}

.label {
  color: white;
}

.input,
.select select {
  background-color: #2a2a2a;
  color: white;
  border-color: #3a3a3a;
}

.input::placeholder {
  color: #888;
}

.input:focus,
.select select:focus {
  border-color: #485fc7;
}

.button.is-primary {
  background-color: #485fc7;
}

.button {
  color: white;
}
</style>