import { ref } from 'vue'

export interface Workout {
  name: string
  duration: string
  date: string
  location: string
  type: string
}

const workouts = ref<Workout[]>([])

export function useWorkouts() {
  const addWorkout = (workout: Workout) => {
    workouts.value.push(workout)
  }

  return {
    workouts,
    addWorkout
  }
}
