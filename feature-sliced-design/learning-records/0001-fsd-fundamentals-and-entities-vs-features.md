# Record 0001: Fundamentos de FSD, Next.js App Router e Separação Entity vs Feature

Date: 2026-08-11

## Context
Primeira sessão de alinhamento e criação do ambiente de aprendizado para Feature-Sliced Design (FSD), com foco na diferenciação entre Entidades (`entities`) e Funcionalidades (`features`) e integração com Next.js App Router e TanStack Query.

## Key Insights
- **Next.js App Router como Thin Router Layer**: A pasta `/app` do Next.js serve unicamente para declarar rotas, layouts e rotas de API, delegando a composição e lógica de negócio para as camadas `pages`, `widgets`, `features` e `entities` em `/src`.
- **Diferenciação Prática de Entity vs Feature**:
  - `entities`: Substantivos e modelos de negócio puros (ex: `user`, `product`). Aloca `useQuery` de leitura básica no segmento `model/`.
  - `features`: Verbos e ações com intenção do usuário (ex: `add-to-cart`, `update-user-avatar`). Aloca `useMutation` no segmento `model/`.
- **Encapsulamento por Public API**: Cada fatia exporta seus símbolos autorizados através de um `index.ts`. Importações profundas cruzadas são proibidas.

## Next Steps
- Explorar a integração prática de TanStack Query com Query Key Factories no segmento `model/`.
- Realizar um exercício hands-on de refatoração de um módulo por domínio tradicional para a estrutura FSD.
