import 'server-only'
import type { Product } from '@/entities/product'

const products: Product[] = [
  { id: '1', name: 'Caderno técnico', description: 'Papel pontilhado, capa rígida.', priceInCents: 4990 },
  { id: '2', name: 'Caneta de precisão', description: 'Ponta 0,5 mm e tinta preta.', priceInCents: 1890 },
]

export async function listProducts() {
  return products
}
