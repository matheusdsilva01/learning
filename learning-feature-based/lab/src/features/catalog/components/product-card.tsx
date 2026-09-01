import type { ReactNode } from 'react'
import type { Product } from '@/entities/product'
import { formatMoney } from '@/shared/lib/format-money'

export type ProductCardProps = {
  product: Product
  action?: ReactNode
}

export function ProductCard({ product, action }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-index" aria-hidden="true">{product.id.padStart(2, '0')}</div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>{formatMoney(product.priceInCents)}</strong>
      </div>
      <div>{action}</div>
    </article>
  )
}
