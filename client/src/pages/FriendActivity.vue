<script setup lang="ts">
import { ref } from 'vue'

const friendActivities = ref([
  {
    name: 'Morning Run',
    duration: '45 minutes',
    date: '2024-01-15',
    location: 'Central Park',
    type: 'cardio',
    friend: 'Sarah Johnson'
  },
  {
    name: 'Weight Training',
    duration: '1 hour',
    date: '2024-01-14',
    location: 'Gold\'s Gym',
    type: 'strength',
    friend: 'Mike Thompson'
  },
  {
    name: 'Yoga Session',
    duration: '1 hour',
    date: '2024-01-13',
    location: 'Zen Studio',
    type: 'flexibility',
    friend: 'Emma Davis'
  },
  {
    name: 'Cycling',
    duration: '90 minutes',
    date: '2025-04-30',
    location: 'City Park',
    type: 'Cardio',
    friend: 'John Smith'
  },
  {
    name: 'Pilates Class',
    duration: '50 minutes',
    date: '2025-05-01',
    location: 'Wellness Studio',
    type: 'Flexibility',
    friend: 'Jane Doe'
  },
  {
    name: 'Hiking Trip',
    duration: '3 hours',
    date: '2025-05-03',
    location: 'Mountain Trail',
    type: 'Strength',
    friend: 'Bob Green'
  }

])
</script>

<template>
  <div class="container">
    <!-- Display Friend Activities -->
    <div class="friend-activities">
      <h2 class="title is-4 workout-title">Friend Activities</h2>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(activity, index) in friendActivities" :key="index">
          <div class="card friend-card">
            <div class="card-content">
              <p class="title is-5">{{ activity.name }}</p>
              <div class="content">
                <p><strong>Friend:</strong> {{ activity.friend }}</p>
                <p><strong>Date:</strong> {{ activity.date }}</p>
                <p><strong>Duration:</strong> {{ activity.duration }}</p>
                <p><strong>Location:</strong> {{ activity.location }}</p>
                <p><strong>Type:</strong> {{ activity.type }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

.friend-card {
  background-color: #1f1f1f;
  border: 1px solid #485fc7;
}

.friend-activities {
  margin-bottom: 3rem;
}
</style>
