# Record 0007: Tooling e Linting Automático (Steiger & ESLint) no FSD

Date: 2026-08-12

## Context
Como automatizar as validações do Feature-Sliced Design (FSD) para prevenir regressões de arquitetura e importações ilegais.

## Key Insights
- **Steiger**: Linter universal oficial para FSD (`npx steiger ./src`). Inspeciona árvores de arquivos e proíbe importações cruzadas ou quebras de hierarquia.
- **ESLint (@feature-sliced/eslint-config)**: Valida no editor se os imports estão sendo feitos pela Public API (`index.ts`).
- **Automação no CI/CD**: Integrar o `npx steiger ./src` no script `npm run lint` ou Git Pre-commit Hooks garante conformidade contínua do time.

## Next Steps
- Aplicar esses conceitos na refatoração do seu projeto Next.js/React.
