/* B"H
 */

import productsData from '../data/todos.json'

interface ProductsData {
  items: todo[] 
}

interface todo{
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const products: ProductsData = productsData as ProductsData
 import type { DataListEnvelope } from './dataEnvelopes'
 
 
 export function getAll() {
   return products as DataListEnvelope<todo>
 }
 
 export function getOne(id: string) {
   return products.items.find((item) => item.id == +id) as todo
   //created product inside product.ts to not cause an error
 }
 
