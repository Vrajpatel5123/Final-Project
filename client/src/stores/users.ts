import type { DataListEnvelope } from "./dataEnvelopes";
import { api } from "@/composables/session";

export interface User{
    id: number
    firstName: string
    role: string
}

export function getAll(): Promise<DataListEnvelope<User>> {
    return api('users')
}

export function get(id: string): Promise<User>{
    return api(`users/${id}`)
}

export function searchUser(
    searchUser: string,
    page: number,
): Promise<DataListEnvelope<User>> {
    return api(`users/search/${searchUser}?page=${page}`)

}