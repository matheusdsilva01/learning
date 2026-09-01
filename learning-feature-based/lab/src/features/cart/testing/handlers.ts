import { http, HttpResponse } from 'msw'
import type { Cart } from '../model/cart'

const initialCart: Cart = {
  id: 'current',
  items: [
    {
      id: 'item-1',
      product: { id: '1', name: 'Caderno técnico', description: 'Papel pontilhado, capa rígida.', priceInCents: 4990 },
      quantity: 1,
    },
  ],
}

export function createCartHandlers({ deleteFails = false } = {}) {
  let cart = structuredClone(initialCart)

  return [
    http.get('http://localhost:3000/api/cart', () => HttpResponse.json(cart)),
    http.delete('http://localhost:3000/api/cart/items/:itemId', ({ params }) => {
      if (deleteFails) return HttpResponse.json({ message: 'failure' }, { status: 500 })
      cart = { ...cart, items: cart.items.filter((item) => item.id !== params.itemId) }
      return HttpResponse.json({ ok: true })
    }),
  ]
}
