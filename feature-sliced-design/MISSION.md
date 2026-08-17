# Mission: Domínio Prático de Feature-Sliced Design (FSD) com Next.js App Router e TanStack Query

## Goal
Aprender a estruturar e refatorar aplicações React/Next.js de baixo a médio porte utilizando a arquitetura Feature-Sliced Design (FSD), eliminando acoplamento excessivo, organizando responsabilidades de forma clara e integrando eficientemente bibliotecas de estado/dados (TanStack Query).

## Motivation
O usuário possui aplicações com muitos componentes e arquivos de requisição agrupados superficialmente por domínio, mas sente falta de regras estritas para divisão de responsabilidades, coesão e acoplamento. Quer evoluir a arquitetura do seu frontend para um padrão profissional usado na indústria.

## Core Competencies
- [x] **Fundamentos de Arquitetura Frontend**: Compreender Acoplamento (Coupling), Coesão (Cohesion) e Abstração no frontend.
- [x] **Camadas e Fatias do FSD**: Dominar as 7 camadas (`app`, `processes`, `pages`, `widgets`, `features`, `entities`, `shared`) e os segmentos (`ui`, `model`, `api`, `lib`, `config`).
- [x] **FSD com Next.js App Router**: Saber integrar a pasta `/app` como rota "fina" (thin routes) com a pasta `/src` organizada em FSD.
- [x] **Gerenciamento de Estado e Data Fetching**: Encapsular TanStack Query (queries, mutations, query key factories) no segmento `model`/`api` de `features` e `entities`.
- [x] **Public API & Encapsulamento**: Aplicar o uso correto de `index.ts` e linters (`steiger`, `@feature-sliced/eslint-config`) para proibir importações circulares e vazamento de implementação.

## Milestones
- [x] **Módulo 1: Fundamentos de Coesão & Acoplamento + Anatomia FSD (Entities vs Features)**
- [x] **Módulo 2: Padrões de Data Fetching e Estado com TanStack Query no FSD (Query Keys & DTOs)**
- [x] **Módulo 3: Integração FSD + Next.js App Router (Thin Routes, Layouts, Error Boundaries, API Routes)**
- [x] **Módulo 4: Análise de Casos de Uso Reais (Filtros de Filmes & DTOs Aninhados)**
- [x] **Módulo 5: Tooling, Linting Automático (Steiger) e Boas Práticas de Time**
