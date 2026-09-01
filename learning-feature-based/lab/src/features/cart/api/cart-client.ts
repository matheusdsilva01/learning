import { apiUrl } from '@/shared/lib/api-url'
import type { Cart } from '../model/cart'

export async function getCart(cartId: string): Promise<Cart> {
  const response = await fetch(apiUrl(`/api/cart?cartId=${cartId}`))
  if (!response.ok) throw new Error('Não foi possível carregar o carrinho.')
  return response.json() as Promise<Cart>
}

export async function removeCartItem(itemId: string) {
  const response = await fetch(apiUrl(`/api/cart/items/${itemId}`), { method: 'DELETE' })
  if (!response.ok) throw new Error('Não foi possível remover o item.')
  return response.json() as Promise<{ ok: true }>
}
