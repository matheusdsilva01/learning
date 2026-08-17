# Record 0002: Composição de Múltiplas Entidades em Features (Caso Prático de Filtros)

Date: 2026-08-11

## Context
Dúvida real trazida pelo aluno sobre a organização de painéis de filtros dinâmicos (Catálogo de Filmes filtrado por Categorias e Produtoras cujos dados vêm de APIs).

## Key Insights
- **Shared é agnóstico ao domínio**: Colocar endpoints como `/api/categories` ou dados de categorias em `shared/` viola o isolamento de camadas. `shared/` deve conter apenas componentes de interface genéricos (ex: `<Select />` neutro).
- **Entidades são independentes**: `category` e `company` são entidades separadas em `entities/category` e `entities/company`. Nenhuma delas precisa saber da existência de filmes ou filtros.
- **Features são compostoras**: A fatia `features/filter-movies` importa a UI neutra de `shared` e os dados/hooks das entidades `category` e `company`, compondo o painel de filtro sem violar a regra de importação unidirecional.

## Next Steps
- Implementar a estrutura de Query Key Factories com TanStack Query para gerenciar invalidação e cache dessas consultas de catálogo de forma previsível.
