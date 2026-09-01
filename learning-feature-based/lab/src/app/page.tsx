import { ProductCard } from '@/features/catalog'
import { listProducts } from '@/features/catalog/index.server'
import { AddToCartButton, CartWidget } from '@/features/cart'

export default async function HomePage() {
  const products = await listProducts()

  return (
    <main>
      <header>
        <p className="kicker">Feature Boundaries / laboratório</p>
        <h1>Catálogo composto na camada app.</h1>
        <p>A rota conhece catálogo e carrinho; as features não se conhecem.</p>
      </header>
      <div className="layout-grid">
        <section aria-label="Catálogo">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              action={<AddToCartButton productId={product.id} />}
            />
          ))}
        </section>
        <CartWidget />
      </div>
    </main>
  )
}
