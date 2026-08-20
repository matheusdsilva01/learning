# 0002 - Encapsulamento de Public API, Composição e Comunicação Inter-Feature

* **Data**: 2026-08-15
* **Status**: Aprovado
* **Domínio**: Arquitetura Frontend / Fronteiras de Módulos & Inversão de Controle

---

## 1. Contexto & O Problema da Dependência Inter-Feature
Ao adotar Feature-Folders, o erro mais comum em times que escalam é a **contaminação cruzada de dependências**:
* A feature `catalog` precisa renderizar o botão "Adicionar ao Carrinho", então importa diretamente a feature `cart`.
* A feature `cart` precisa validar se o produto ainda existe no catálogo, então importa a feature `catalog`.
* **Resultado**: Dependência circular (`cart <-> catalog`), acoplamento temporal de bundling e perda total da capacidade de testar ou extrair features isoladamente.

Além disso, desenvolvedores recorrem a *Deep Imports* (`import { CartItem } from '@/features/cart/components/cart-item'`), vazando detalhes de implementação internos que deveriam ser livres para sofrer refatoração sem quebrar outros módulos.

---

## 2. Decisões Arquiteturais

### 2.1 Fronteira Estrita de Public API (`index.ts`)
1. Toda feature DEVE possuir um único ponto de entrada público: `src/features/<nome>/index.ts`.
2. **Proibição de Wildcards Cegos**: Evitar `export * from './internal'` indiscriminado. Exportar explicitamente apenas:
   - Componentes raízes orquestradores (ex: `<CartDrawer />`, `<AddToCartButton />`).
   - Hooks/Selectors de leitura pública de estado (ex: `useCartCount()`, `useCartSummary()`).
   - Tipos de contrato público e DTOs (ex: `CartItemDTO`, `CartState`).
3. Qualquer import com caminho profundo (ex: `@features/cart/components/*` ou `@features/cart/api/*`) é classificado como violação arquitetural bloqueante no CI via ESLint.

### 2.2 Desacoplamento via Inversão de Controle e Composição (Slot Pattern)
Quando uma feature visual precisa conter elementos de outra feature, a dependência direta é evitada através de **Composição (React Slots / Render Props)**:
* O `ProductCard` (da feature `catalog`) NÃO importa o `AddToCartButton` (da feature `cart`).
* O `ProductCard` expõe uma prop de slot (`actionSlot?: React.ReactNode` ou `children`).
* A página/rota orquestradora (na camada `app/` ou `routes/`) injeta o `<AddToCartButton />` dentro do `<ProductCard />`.

```tsx
// Orquestrador (src/app/(shop)/catalog/page.tsx)
<ProductCard product={item} actionSlot={<AddToCartButton productId={item.id} />} />
```

### 2.3 Camada Transversal de Entidades (`src/entities/` ou `src/shared/types/`)
Tipagens e modelos de dados universais do negócio que transcendem uma única feature (ex: `Product`, `User`, `Money`, `Address`) NÃO pertencem a uma feature específica. Eles residem na camada `src/entities/` ou `src/shared/types/`, permitindo que `catalog`, `cart` e `checkout` compartilhem o mesmo contrato canônico sem dependerem uns dos outros.

### 2.4 Thin Routes (Roteamento Delgado)
No Next.js App Router:
* Os arquivos `src/app/**/page.tsx` funcionam estritamente como **Controllers/Orquestradores Finos** (Thin Routes).
* Uma `page.tsx` não contém lógica de negócio, formulários complexos ou chamadas de API diretas. Ela apenas:
  1. Extrai parâmetros de rota e search params.
  2. Invoca Server Components ou a Public API da feature correspondente.
  3. Realiza a composição de slots entre diferentes features.

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Trade-off |
| :--- | :--- |
| **Zero Dependências Circulares**: Grafo acíclico direcionado (DAG) limpo. | Exige maior uso de composição na camada de rotas/páginas. |
| **Refatoração Interna Segura**: Mudar a estrutura interna de `cart/` não quebra `catalog` ou `checkout`. | Requer disciplina rigorosa na manutenção do `index.ts` público. |
| **Testabilidade Isolada**: Cada feature pode ser mockada e testada sem carregar a árvore de dependências do app inteiro. | Criação de tipos compartilhados em `entities/` para contratos transversais. |
