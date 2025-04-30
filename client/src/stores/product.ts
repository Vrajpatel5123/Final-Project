/* B"H
 */

import productsData from '../data/todos.json'
import type { DataListEnvelope } from './dataEnvelopes'
import { api } from '@/composables/session'

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
 
 export function getOne(id: string) {
   return api<todo>(`/todos/${id}`)
   //created product inside product.ts to not cause an error
 }
 
