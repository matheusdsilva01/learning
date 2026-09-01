# ADR 0004: governança executável

Status: aceito

## Contexto

Documentar uma matriz de imports não impede erosão arquitetural.

## Decisão

- `eslint-plugin-boundaries` 7 usa `boundaries/dependencies` para feedback no editor.
- `eslint-import-resolver-typescript` resolve aliases definidos no `tsconfig`.
- O preset estrito acusa arquivos e dependências locais desconhecidos.
- Dependency Cruiser 18 valida o grafo completo e ciclos no CI.
- Fixtures positivas e negativas demonstram que as regras produzem o resultado esperado.
- Testes não são ignorados globalmente pelas regras arquiteturais.

## Consequências

O linter valida apenas a política codificada e os arquivos analisados. Build aprovado não prova qualidade arquitetural fora desse modelo.
