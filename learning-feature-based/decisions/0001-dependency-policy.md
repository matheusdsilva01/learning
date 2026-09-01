# ADR 0001: direção das dependências

Status: aceito

## Contexto

Permitir imports laterais por API pública evita deep imports, mas ainda admite ciclos e ownership ambíguo.

## Decisão

- `app` pode importar APIs públicas de `features`, `entities` e `shared`.
- `features` podem importar `entities` e `shared`, mas não outras features.
- `entities` podem importar `shared`.
- `shared` importa apenas código de `shared` e pacotes externos.
- Imports internos de um mesmo módulo são livres.
- Colaborações entre features são montadas em `app` ou em um compositor pertencente a uma camada superior.

## Consequências

O grafo fica acíclico por construção entre camadas. Em contrapartida, composições reutilizadas podem exigir um módulo adicional e exceções de domínio devem ser documentadas em novo ADR.
