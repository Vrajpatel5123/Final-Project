<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const workoutName = ref('')
const workoutDate = ref('')
const workoutDuration = ref('')
const workoutLocation = ref('')
const workoutType = ref('select-workout')
const statusMsg = ref('')
const errorMsg = ref('')

const isModalActive = ref(false)

function toggleModal() {
    isModalActive.value = !isModalActive.value
}

// Assuming you have a workouts array to store the entries
interface Workout {
  name: string;
  duration: string;
  date: string;
  location: string;
  type: string;
}

const workouts = ref<Workout[]>([])

function addWorkout() {
  if (workoutName.value && workoutDuration.value && workoutDate.value) {
    workouts.value.push({
      name: workoutName.value,
      duration: workoutDuration.value,
      date: workoutDate.value,
      location: workoutLocation.value,
      type: workoutType.value
    })
    // Reset the form fields
    workoutName.value = ''
    workoutDuration.value = ''
    workoutDate.value = ''
    workoutLocation.value = ''
    workoutType.value = 'select-workout'
    statusMsg.value = 'Workout added successfully!'
    toggleModal() // Close modal after successful addition
  } else {
    errorMsg.value = 'Please fill in all required fields'
  }
}
</script>

<template>
    <div class="container">
        <!-- Centered Add Workout Button -->
        <div class="add-workout-button">
            <button class="button is-primary is-large" @click="toggleModal">
                Add Workout
            </button>
        </div>

        <!-- Display Workouts -->
        <div class="workouts-list" v-if="workouts.length > 0">
            <h2 class="title is-4 workout-title">Your Workouts</h2>
            <div class="columns is-multiline">
                <div class="column is-4" v-for="(workout, index) in workouts" :key="index">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-5">{{ workout.name }}</p>
                            <div class="content">
                                <p><strong>Date:</strong> {{ workout.date }}</p>
                                <p><strong>Duration:</strong> {{ workout.duration }}</p>
                                <p><strong>Location:</strong> {{ workout.location }}</p>
                                <p><strong>Type:</strong> {{ workout.type }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal" :class="{ 'is-active': isModalActive }">
            <div class="modal-background" @click="toggleModal"></div>
            <div class="modal-content">
                <form class="box" @submit.prevent="addWorkout">
                    <h1 class="title">Add Workout</h1>
                    <!-- ...existing form fields... -->
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

                    <div v-if="errorMsg" class="notification is-danger">
                        {{ errorMsg }}
                    </div>
                    
                    <div v-if="statusMsg" class="notification is-success">
                        {{ statusMsg }}
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" class="button is-primary">Save</button>
                        </div>
                        <div class="control">
                            <button type="button" class="button" @click="toggleModal">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
        </div>
    </div>
</template>

<style scoped>
.box {
    margin: 0;
    background-color: #1a1a1a;
    color: white;
}

.modal-content {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
}

/* Dark theme styles */
.title {
    color: white;
}

.label {
    color: white;
}

.input, .select select {
    background-color: #2a2a2a;
    color: white;
    border-color: #3a3a3a;
}

.input::placeholder {
    color: #888;
}

.input:focus, .select select:focus {
    border-color: #485fc7;
}

.modal-background {
    background-color: rgba(0, 0, 0, 0.85);
}

.button.is-primary {
    background-color: #485fc7;
}

.button {
    color: white;
}

/* Add this to your template's parent element */
:global(body) {
    background-color: black;
    color: white;
}

.container {
    padding: 2rem;
}

.add-workout-button {
    text-align: center;
    margin-bottom: 2rem;
}

.workouts-list {
    margin-top: 2rem;
}

.workout-title {
    color: white;
    text-align: center;
    margin-bottom: 2rem;
}

.card {
    background-color: #1a1a1a;
    color: white;
    border: 1px solid #3a3a3a;
    height: 100%;
}

.card-content {
    padding: 1.5rem;
}

.content strong {
    color: #485fc7;
}

.columns {
    margin-top: 1rem;
}

.column {
    padding: 1rem;
}
</style>