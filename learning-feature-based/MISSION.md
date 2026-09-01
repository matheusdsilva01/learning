# Missão: projetar fronteiras de frontend verificáveis

## Por que

Quero refatorar e evoluir aplicações React/Next.js sem espalhar uma mudança de negócio por diretórios técnicos. Ao concluir esta trilha, devo conseguir criar módulos coesos, explicitar suas dependências e usar ferramentas para detectar violações antes do merge.

## Sucesso significa

- Dado um pequeno e-commerce organizado por tipo técnico, delimitar `catalog` e `cart` com justificativas baseadas em responsabilidade e frequência de mudança.
- Refatorar o projeto sem alterar o comportamento coberto pelos testes.
- Expor APIs públicas pequenas e impedir imports profundos ou dependências entre features.
- Compor Server e Client Components sem contaminar o grafo cliente com código exclusivo do servidor.
- Classificar estado local, de URL e de servidor, implementando uma mutation e um teste de integração com MSW.
- Fazer ESLint, Dependency Cruiser, testes e build aprovarem a solução final.
- Registrar os trade-offs da solução e compará-la com Feature-Sliced Design sem tratar uma metodologia como regra universal.

## Restrições

- Stack de prática: Next.js App Router, React e TypeScript.
- Gerenciador de pacotes: npm.
- Domínio recorrente: e-commerce B2C.
- As lições devem ser curtas; a prática executável fica em `lab/`.
- Exemplos técnicos precisam corresponder às versões registradas em `RESOURCES.md`.

## Fora de escopo

- Ensinar DDD completo, microfrontends ou desenho de backend.
- Prescrever uma única estrutura para todo tamanho de produto ou equipe.
- Migrar integralmente para Feature-Sliced Design.
- Tratar nomes de pastas como substitutos para ownership, testes ou contratos de runtime.

## Evidência final

O capstone termina quando `npm run verify` passa em `lab/` e um learning record descreve: a fronteira escolhida, uma alternativa rejeitada, a evidência executável e uma limitação remanescente.
