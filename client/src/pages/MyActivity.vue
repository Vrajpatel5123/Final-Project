<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
// import AddWorkout from '@/components/AddWorkout.vue'
import { useWorkouts } from '../composables/useWorkouts'


const { workouts } = useWorkouts()

</script>

<template>
  <section class="columns">
    <div class="column is-half">
      <TodoList />
    </div>
    <div class="column is-half">
      <div class="workouts-list" v-if="workouts.length > 0">
        <h2 class="title is-4 workout-title">Your Workouts</h2>
        <div class="columns is-multiline">
          <div class="column is-12" v-for="(workout, index) in workouts" :key="index">
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
    </div>
  </section>


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
