# Record 0005: Next.js App Router com FSD (Roteamento Fino)

Date: 2026-08-11

## Context
Como integrar o Next.js App Router com a estrutura do FSD sem que o App Router vire um monólito rígido acoplado ao framework.

## Key Insights
- **Thin Router Pattern**: A pasta `app/` do Next.js é tratada apenas como uma camada de inicialização e roteamento fina.
- **Isolamento em `src/pages/`**: A composição de widgets, features e entidades é realizada dentro de `src/pages/{page-name}`.
- **Reutilização e Testabilidade**: Mover a página para `src/pages/` torna a tela facilmente testável fora das convenções específicas de roteamento do Next.js.

## Next Steps
- Analisar projetos open-source reais (como o `yurisldk/realworld-react-fsd`) e preparar o plano de refatoração prática.
