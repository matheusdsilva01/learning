import type { Product } from '@/entities/product'

export type CartItem = {
  id: string
  product: Product
  quantity: number
}

export type Cart = {
  id: string
  items: CartItem[]
}

export const cartKeys = {
  all: ['cart'] as const,
  detail: (cartId: string) => [...cartKeys.all, 'detail', cartId] as const,
}
