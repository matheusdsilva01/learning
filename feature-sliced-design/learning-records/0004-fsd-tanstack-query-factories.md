# Record 0004: TanStack Query & Query Key Factories no FSD

Date: 2026-08-11

## Context
Padronização do gerenciamento de estado assíncrono e invalidação de cache entre fatias no FSD usando o TanStack Query.

## Key Insights
- **Encapsulamento de Query Keys**: As chaves de cache pertencem ao segmento `model/` da entidade (`entities/movie/model/movieQueries.ts`).
- **Invalidação Tipo-Segura em Features**: Mutações em `features/rate-movie` importam `movieQueries` da Public API da entidade para invalidar caches com precisão sem digitar strings mágicas soltas.
- **Estrutura Hierárquica de Chaves**: O padrão `all -> lists -> list(filters)` permite invalidar tanto consultas específicas quanto todo o domínio de filmes de forma simples.

## Next Steps
- Explorar a integração prática com o **Next.js App Router** (`src/app` vs `src/pages` e roteamento fino).
