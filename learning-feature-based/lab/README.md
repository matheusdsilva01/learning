# Laboratório executável

Este projeto é a prova do contrato ensinado nas lições. Ele contém um catálogo renderizado no servidor, um carrinho interativo no cliente, uma mutation HTTP, teste de integração e duas formas de validar dependências.

## Requisitos

- Node.js 24
- npm 11

## Executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Verificação completa

```bash
npm run verify
```

O comando executa, nesta ordem:

1. ESLint com `boundaries/dependencies`.
2. Dependency Cruiser sobre o grafo completo.
3. Probe negativo que precisa ser rejeitado pelas duas ferramentas.
4. Vitest, Testing Library e MSW 2.
5. Build de produção do Next.js.
6. Validação de links e IDs dos HTML da trilha.

## Mapa

```text
src/
├── app/                       # composição e adaptação ao Next.js
├── features/
│   ├── catalog/               # apresentação e leitura do catálogo
│   └── cart/                  # cache, mutation e UI do carrinho
├── entities/
│   └── product/               # contrato estável de Product
└── shared/
    ├── lib/                   # URL e formatação sem regra de feature
    └── testing/               # infraestrutura MSW sem conhecer features
```

## Dependências permitidas

```text
app → features → entities → shared
  └───────────────→ shared
```

Uma feature não importa outra. `src/app/page.tsx` conhece `catalog` e `cart` e monta a colaboração.

## Roteiro do capstone

1. Execute `npm run verify` para registrar a baseline.
2. Leia `challenges/legacy-inventory.md` e produza seu mapa de dispersão.
3. Escolha uma mudança: quantidade, cupom ou remoção de item.
4. Implemente sem criar `catalog → cart` e sem deep imports.
5. Adicione um teste de erro MSW antes do comportamento.
6. Introduza temporariamente um import proibido e confirme os dois diagnósticos arquiteturais.
7. Registre a evidência em `../learning-records/`.

## O que o laboratório não prova

- Correção de um backend ou banco real.
- Segurança de autenticação e autorização.
- Comportamento de concorrência em múltiplos clientes.
- Que esta granularidade é adequada a qualquer produto.
- Que lint aprovado substitui revisão de ownership e coesão.
