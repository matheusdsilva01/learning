# Inventário legado para diagnóstico

Antes da estrutura atual, considere esta organização:

```text
src/
├── components/
│   ├── product-card.tsx
│   └── cart-panel.tsx
├── hooks/
│   └── use-cart.ts
├── services/
│   ├── catalog-api.ts
│   └── cart-api.ts
├── types/
│   └── product.ts
└── app/page.tsx
```

## Tarefa

Para o requisito “remover item do carrinho e reconciliar o total”:

1. Liste os arquivos tocados.
2. Separe capacidade, entidade e infraestrutura.
3. Proponha APIs públicas mínimas.
4. Identifique onde `catalog` e `cart` precisam ser compostos.
5. Compare sua proposta com a solução em `src/`.

Não use quantidade de arquivos como justificativa principal.
