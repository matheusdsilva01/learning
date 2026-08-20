# 0003 - Estado Co-localizado, Server State (TanStack Query) e Estratégia de Testes

* **Data**: 2026-08-15
* **Status**: Aprovado
* **Domínio**: Gerenciamento de Estado / Cache / Testes Automatizados

---

## 1. Contexto & O Problema do Estado Global Centralizado
Historicamente, aplicações frontend centralizavam todo o estado (dados de API, filtros de UI, modais abertos) em uma única store monolítica do Redux (`src/store/index.ts`) e espalhavam testes em uma pasta raiz `/tests/`.

Isso causava:
1. **Poluição e Conflitos de Cache**: Chaves de API genéricas como `['items']` ou `['data']` colidiam entre features diferentes.
2. **Perda de Proximidade nos Testes**: Refatorar um componente da feature exigia caçar seu teste em `/tests/unit/components/cart/`.
3. **Overhead de Estado Global**: Dados de formulários efêmeros eram mantidos no Redux sem necessidade.

---

## 2. Decisões Arquiteturais

### 2.1 Separação Estrita de 3 Tipos de Estado
1. **Server State (TanStack Query)**:
   - Toda query, mutation e DTO vive exclusivamente em `src/features/<feature>/api/`.
   - Utilização obrigatória do padrão **Query Key Factory** para garantir tipagem estrita e evitar colisões de chave.
2. **Feature UI State (Zustand ou Context Co-localizado)**:
   - Estados de interface restritos à feature (ex: drawer aberto/fechado, etapa atual do wizard) residem em `src/features/<feature>/stores/`.
3. **URL State (Search Params)**:
   - Estados que devem ser compartilháveis via link ou persistir no refresh (ex: filtros de busca, ordenação e paginação) vivem na URL através de custom hooks na feature (`useCatalogFilters`).

### 2.2 Padrão Query Key Factory por Feature
Cada feature exporta seu próprio mapa hierárquico de chaves:
```typescript
// src/features/cart/api/query-keys.ts
export const cartKeys = {
  all: ['cart'] as const,
  details: () => [...cartKeys.all, 'detail'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
  item: (id: string) => [...cartKeys.items(), id] as const,
};
```

### 2.3 Co-locação Estrita de Testes Automatizados
* Testes unitários de hooks e componentes vivem ao lado dos arquivos que testam:
  * `src/features/cart/components/cart-drawer.tsx`
  * `src/features/cart/components/cart-drawer.test.tsx`
* Mocks de rede utilizam **MSW (Mock Service Worker)** com handlers isolados por feature (`src/features/cart/api/mocks.ts`).
* Deleção limpa: ao deletar a pasta `src/features/cart/`, todos os testes, mocks, queries e stores correspondentes são removidos juntos.

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Mitigação |
| :--- | :--- |
| **Invalidação Cirúrgica de Cache**: Invalidar `cartKeys.all` limpa apenas o cache de carrinho sem tocar em catálogo ou pedidos. | Exige padronização rigorosa de `queryKeys` em todas as features. |
| **Testes Autônomos com MSW**: A feature pode ser testada isoladamente sem inicializar o servidor backend ou rotas completas. | Necessidade de configurar wrappers de teste (`TestQueryClientProvider`). |
| **Zero Acoplamento de Testes**: Não há diretório `/tests` monolítico que quebre quando uma feature for renomeada ou movida. | Configuração do Vitest/Jest com regex `**/*.test.tsx` para varrer a árvore de `src/features/`. |
