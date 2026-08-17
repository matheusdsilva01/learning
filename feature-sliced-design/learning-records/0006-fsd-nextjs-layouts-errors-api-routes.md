# Record 0006: Layouts, Errors, Skeletons e API Routes no FSD

Date: 2026-08-12

## Context
Mapeamento de arquivos especiais do Next.js App Router (`layout.tsx`, `error.tsx`, `loading.tsx`, `route.ts`) para a arquitetura FSD.

## Key Insights
- **Layouts**: Root Layout consome `src/app/providers`. Layouts aninhados consomem `src/widgets/dashboard-layout`.
- **Error & Loading**: Skeletons e boundaries re-exportam de `src/pages/{page}` ou `src/shared/ui/`.
- **API Routes**: Os handlers `route.ts` apenas delegam a chamada para funções de API em `src/entities/{domain}/api` ou `src/shared/api`.

## Next Steps
- Apresentar ferramentas automáticas como **Steiger** e `@feature-sliced/eslint-config` para travar essa estrutura contra regressões.
