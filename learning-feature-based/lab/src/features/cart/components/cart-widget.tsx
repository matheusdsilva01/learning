'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { formatMoney } from '@/shared/lib/format-money'
import { getCart, removeCartItem } from '../api/cart-client'
import { cartKeys, type Cart } from '../model/cart'

const cartId = 'current'

export function CartWidget() {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')
  const cartQuery = useQuery({
    queryKey: cartKeys.detail(cartId),
    queryFn: () => getCart(cartId),
  })

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onMutate: async (itemId, context) => {
      setMessage('')
      await context.client.cancelQueries({ queryKey: cartKeys.detail(cartId) })
      const previous = context.client.getQueryData<Cart>(cartKeys.detail(cartId))
      context.client.setQueryData<Cart>(cartKeys.detail(cartId), (current) => current
        ? { ...current, items: current.items.filter((item) => item.id !== itemId) }
        : current)
      return { previous }
    },
    onError: (_error, _itemId, result, context) => {
      context.client.setQueryData(cartKeys.detail(cartId), result?.previous)
      setMessage('Falha ao remover. O item foi restaurado.')
    },
    onSuccess: () => setMessage('Item removido e confirmado.'),
    onSettled: (_data, _error, _itemId, _result, context) =>
      context.client.invalidateQueries({ queryKey: cartKeys.detail(cartId) }),
  })

  if (cartQuery.isPending) return <aside className="cart-panel" aria-label="Carrinho">Carregando carrinho…</aside>
  if (cartQuery.isError) return <aside className="cart-panel" aria-label="Carrinho">Falha ao carregar.</aside>

  const total = cartQuery.data.items.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0,
  )

  return (
    <aside className="cart-panel" aria-label="Carrinho">
      <p className="kicker">Carrinho / cache cliente</p>
      <h2>{cartQuery.data.items.length} item(ns)</h2>
      {cartQuery.data.items.map((item) => (
        <div className="cart-row" key={item.id}>
          <span>{item.product.name}</span>
          <button
            type="button"
            disabled={removeMutation.isPending}
            onClick={() => removeMutation.mutate(item.id)}
            aria-label={`Remover ${item.product.name}`}
          >
            Remover
          </button>
        </div>
      ))}
      <strong>Total: {formatMoney(total)}</strong>
      {message && <p role="status">{message}</p>}
    </aside>
  )
}
