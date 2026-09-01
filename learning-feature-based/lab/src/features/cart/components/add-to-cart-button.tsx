'use client'

import { useState } from 'react'

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false)

  return (
    <button className="add-button" type="button" onClick={() => setAdded(true)}>
      {added ? 'Adicionado' : `Adicionar produto ${productId}`}
    </button>
  )
}
