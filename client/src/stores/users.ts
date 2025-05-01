import type { DataListEnvelope } from "./dataEnvelopes";
import { api } from "@/composables/session";

export interface User{
    id: number
    name: string
    isAdmin: boolean
    email: string
    created_at: string
}

export function getAll(): Promise<DataListEnvelope<User>> {
    return api<DataListEnvelope<User>>('users')
}

export function get(id: string): Promise<User>{
    return api<DataListEnvelope<User>>(`users/${id}`).then(response => response as unknown as User)
}

export function searchUser(
    searchUser: string,
    page: number,
): Promise<DataListEnvelope<User>> {
    return api(`users/search/${searchUser}?page=${page}`)

}