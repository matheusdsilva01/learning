# Glossário

## API pública (Public API)

Conjunto de entradas que consumidores externos podem importar. Um `index.ts` organiza esse contrato, mas não impede imports profundos sozinho.

## Co-localização (colocation)

Manter um artefato próximo de quem o altera ou consome. É uma heurística de coesão, não uma exigência de que tudo viva em uma única pasta.

## Compositor (composer)

Módulo em uma camada superior que conhece duas ou mais features e monta a colaboração entre elas sem criar dependência lateral.

## Estado do servidor (server state)

Representação local de dados cuja autoridade está fora do frontend. Cache, stale time, refetch e concorrência fazem parte do problema.

## Feature

Módulo orientado a uma capacidade ou fluxo de negócio, com responsabilidade e motivo de mudança reconhecíveis. Neste workspace, `cart` é uma feature ampla; no FSD, “feature” costuma representar uma interação relevante e reutilizada.

## Fronteira de ambiente

Limite entre os grafos server e client do React. Não coincide automaticamente com a fronteira arquitetural de uma feature.

## Import profundo (deep import)

Importação que atravessa a API pública e aponta para um detalhe interno, como `@/features/cart/components/cart-item`.

## Raio de mudança (blast radius)

Conjunto de artefatos afetados por uma alteração. Uma boa arquitetura o torna mais visível e controlável, mas não garante uma quantidade fixa de arquivos.

## Slice

Unidade repetível dentro de uma camada do FSD, como `entities/product`. Não é sinônimo universal de feature.

## Thin route

Convenção local em que `page.tsx` concentra adaptação ao roteador e composição. Next.js permite lógica específica da rota; “thin” é uma escolha, não uma regra do framework.
