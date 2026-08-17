# Record 0003: Alocação de Tipagem DTO e Objetos Aninhados (ex: TMDB Movie)

Date: 2026-08-11

## Context
Dúvida enviada pelo usuário sobre onde posicionar tipos aninhados (ex: `production_companies` dentro de um payload de `Movie` do TMDB).

## Key Insights
- **Contratos DTO pertencem à fatia da API**: `MovieProductionCompany` e `MovieGenre` devem ser declarados em `entities/movie/model/types.ts` por fazerem parte do payload do filme.
- **Evitando Cross-Slice Imports**: Fatias dentro da camada `entities` não devem importar tipos umas das outras para não criar acoplamento sutil entre fatias no mesmo nível hierárquico.
- **Snapshot DTO vs Entidade Completa**: O snapshot de uma produtora dentro do filme é diferente da entidade completa de produtora caso exista uma página própria para ela.

## Next Steps
- Apresentar o padrão de **Query Key Factories** com TanStack Query para gerenciar filtros dinâmicos de filmes.
