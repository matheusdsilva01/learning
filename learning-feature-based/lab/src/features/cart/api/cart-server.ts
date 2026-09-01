import 'server-only'
import type { Cart } from '../model/cart'

let cart: Cart = {
  id: 'current',
  items: [
    {
      id: 'item-1',
      product: { id: '1', name: 'Caderno técnico', description: 'Papel pontilhado, capa rígida.', priceInCents: 4990 },
      quantity: 1,
    },
  ],
}

export function readCart() {
  return cart
}

export function deleteCartItem(itemId: string) {
  cart = { ...cart, items: cart.items.filter((item) => item.id !== itemId) }
  return { ok: true as const }
}
