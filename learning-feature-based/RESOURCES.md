# Recursos sobre fronteiras de frontend

Fontes consultadas em 31 de agosto de 2026. Para exemplos dependentes de versão, consulte também `lab/package.json`.

## Conhecimento

- [Next.js 16.3.3: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  Fonte oficial para grafos server/client, serialização e composição por `children`. Use ao revisar fronteiras do App Router.
- [Next.js: Server and Client Boundary](https://nextjs.org/docs/app/guides/server-and-client-boundary)
  Detalha onde cada tipo de componente executa e como evitar environment poisoning.
- [React: `use client`](https://react.dev/reference/rsc/use-client)
  Referência normativa para a fronteira do grafo cliente e tipos serializáveis.
- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
  Regras para identidade, variáveis e serialização de chaves.
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
  Distingue atualização visual por `variables` de atualização direta do cache e documenta rollback.
- [TanStack Query: Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
  Explica que invalidar marca dados como stale e pode iniciar refetch; não remove automaticamente o cache.
- [MSW 2: Node.js integration](https://mswjs.io/docs/integrations/node)
  Ciclo `listen`, `resetHandlers` e `close` para Vitest/Jest.
- [Testing Library: user-event 14](https://testing-library.com/docs/user-event/intro)
  Interações por `userEvent.setup()` e consultas orientadas à acessibilidade.
- [JS Boundaries 7: regra `dependencies`](https://www.jsboundaries.dev/docs/rules/dependencies/)
  API atual para políticas arquiteturais. As antigas `element-types` e `entry-point` estão depreciadas.
- [JS Boundaries: TypeScript e resolvers](https://www.jsboundaries.dev/docs/guides/typescript-support/)
  Necessário para que aliases locais não sejam confundidos com pacotes externos.
- [Dependency Cruiser 18: rules tutorial](https://github.com/sverweij/dependency-cruiser/blob/v18.2.0/doc/rules-tutorial.md)
  Referência para ciclos, peer folders e reutilização de capturas com `$1`.
- [Feature-Sliced Design 2.1: Layers](https://feature-sliced.design/docs/reference/layers)
  Especificação das camadas, direção de dependência e exceções documentadas.
- [Feature-Sliced Design 2.1 com Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs)
  Recomenda `_app` e `_pages` para evitar conflito com diretórios especiais do framework e descreve `index.server.ts`.
- [Steiger](https://github.com/feature-sliced/steiger)
  Linter estrutural oficial do FSD. Ainda é beta; fixe versões antes de adotá-lo em CI.
- [Colocation, Kent C. Dodds](https://kentcdodds.com/blog/colocation)
  Princípio de proximidade entre código e consumidores. Não implica que todo artefato deva estar na mesma pasta.
- [Screaming Architecture, Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
  Argumento histórico para estruturas que revelam capacidades do produto.
- [Bulletproof React: Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
  Repositório de referência, não especificação. A versão atual evita barrels obrigatórios e prefere que features não importem outras features; este workspace adota APIs públicas explícitas com enforcement por ferramentas.

## Sabedoria e comunidade

- [FSD Discussions](https://github.com/feature-sliced/documentation/discussions)
  Use para confrontar casos de fronteira com praticantes da metodologia.
- [TanStack Discord](https://tlinz.com/discord)
  Use para problemas de concorrência, hidratação e ownership de cache que não aparecem em exemplos pequenos.
- [MSW Discussions](https://github.com/mswjs/msw/discussions)
  Use para limitações de interceptação e integração com ambientes de teste.

## Lacunas

- Não há benchmark universal que relacione número de features ou tamanho da equipe à necessidade de FSD.
- Não há uma taxonomia única de “feature” aceita por todo o ecossistema React.
- As configurações de ferramentas precisam ser executadas no projeto real; snippets isolados não provam enforcement.
