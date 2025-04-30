import * as myFetch from './myFetch'
import {ref} from 'vue'
import {get, type User} from '@/stores/users'

export function api<T>(action: string): Promise<T>{
    return myFetch.api<T>(action)
}

const session = ref({
    user: null as User |null
})

export function refSession(){
    return session
}

export const isAdmin = () => session.value?.user?.role === 'admin'

export const isLoggedIn = () => session.value?.user !== null

export function login(id: number){
    return get(id.toString()).then((user) => {
        session.value.user = user
    })
}

export function logout(){
    session.value.user = null
}