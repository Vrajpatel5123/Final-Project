

import productsData from '../data/todos.json'
import type { DataListEnvelope } from './dataEnvelopes'
import { api } from '@/composables/session'
import type { todos } from './product'

interface ProductsData {
  items: todo[] 
}

export interface todo{
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const products: ProductsData = productsData as ProductsData
 
 
 
 export function getAll() {
   return api<DataListEnvelope<todo>>('/todos')
 }

 export function search(query: string, limit = 10, offset = 0) {
  return api<DataListEnvelope<todos>>(`products/search/${query}?offset=${offset}&limit=${limit}`)
}
 
 export function getOne(id: string) {
   return api<todo>(`/todos/${id}`)
   //created product inside product.ts to not cause an error
 }
 
