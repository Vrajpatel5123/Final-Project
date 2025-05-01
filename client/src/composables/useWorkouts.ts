import { ref, watch } from 'vue'
import { useUsers } from './useUsers'

export interface Workout {
  id?: number
  name: string
  duration: string
  date: string
  location: string
  type: string
  userId?: number
}

// Create a singleton pattern for workouts
const workouts = ref<Workout[]>([])
const isLoading = ref(false)
const loadError = ref('')

// Demo workouts
const demoWorkouts: Workout[] = [
  { 
    id: 1, 
    name: 'Morning Run', 
    duration: '30 minutes', 
    date: '2025-04-25', 
    location: 'Central Park', 
    type: 'Cardio',
    userId: 1
  },
  { 
    id: 2, 
    name: 'Strength Training', 
    duration: '45 minutes', 
    date: '2025-04-26', 
    location: 'Home Gym', 
    type: 'Strength',
    userId: 1
  },
  { 
    id: 3, 
    name: 'Yoga Session', 
    duration: '60 minutes', 
    date: '2025-04-28', 
    location: 'Yoga Studio', 
    type: 'Flexibility',
    userId: 2
  },
  {
    id: 4,
    name: 'HIIT Workout',
    duration: '25 minutes',
    date: '2025-04-29',
    location: 'Fitness Center',
    type: 'Cardio',
    userId: 3
  }
]

// Initialize with demo workouts
workouts.value = [...demoWorkouts]

// In a real app, we would have API functions to load workouts for a specific user

export function useWorkouts() {
  const { selectedUser } = useUsers()
  
  // Add a new workout
  const addWorkout = (workout: Workout) => {
    // Add user ID to the workout
    const newWorkout: Workout = {
      ...workout,
      id: Math.max(0, ...workouts.value.map(w => w.id || 0)) + 1,
      userId: selectedUser.value?.id
    }
    
    workouts.value.unshift(newWorkout)
    
    // In a real app, we would save to backend here
    return Promise.resolve(newWorkout)
  }
  
  // Get workouts for the current user
  const getUserWorkouts = () => {
    if (!selectedUser.value) return []
    
    return workouts.value.filter(workout => 
      workout.userId === selectedUser.value?.id
    )
  }
  
  // Delete a workout
  const deleteWorkout = (id: number) => {
    const index = workouts.value.findIndex(w => w.id === id)
    if (index !== -1) {
      workouts.value.splice(index, 1)
      // In a real app, we would delete from backend here
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  }
  
  return {
    workouts,
    addWorkout,
    getUserWorkouts,
    deleteWorkout,
    isLoading,
    loadError
  }
}
