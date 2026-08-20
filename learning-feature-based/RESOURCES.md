# Recursos de Aprendizado (Knowledge Base)

Fontes canônicas de alta confiança sobre arquitetura modular no frontend, limites de dependência e Feature-Folders.

---

## 1. Arquiteturas Modulares & Feature-Folders

* **[Bulletproof React](https://github.com/alan2207/bulletproof-react)**
  * *Autor*: Alan Avezoux
  * *Tipo*: Arquitetura de Referência / Repositório
  * *Relevância*: O padrão de facto da comunidade React moderna para Feature-Folders pragmático. Define a anatomia interna de features (`api`, `components`, `hooks`, `types`, `index.ts`) e o isolamento de rotas.

* **[Colocation (Kent C. Dodds)](https://kentcdodds.com/blog/colocation)**
  * *Autor*: Kent C. Dodds
  * *Tipo*: Artigo Técnico
  * *Relevância*: Estabelece o princípio fundamental: *"Coloque o código o mais próximo possível de onde ele é utilizado"*. Essencial para entender por que testes, estilos e hooks devem viver dentro da feature.

* **[Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)**
  * *Autor*: Robert C. Martin (Uncle Bob)
  * *Tipo*: Artigo Canônico de Arquitetura
  * *Relevância*: Uma estrutura de diretórios deve gritar o que a aplicação *faz* (ex: `catalog`, `cart`, `checkout`), e não o framework que ela usa (`components`, `controllers`, `models`).

* **[Feature-Sliced Design (FSD) Specification](https://feature-sliced.design/)**
  * *Autor*: Core Team FSD
  * *Tipo*: Especificação Arquitetural Formal
  * *Relevância*: Metodologia estruturada com camadas estritas (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). Utilizada como comparativo avançado no Módulo 4.

---

## 2. Governança, Limites de Dependência e Linters

* **[eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries)**
  * *Autor*: Javier Brea
  * *Tipo*: Ferramenta de Análise Estática
  * *Relevância*: Permite definir regras arquiteturais no ESLint para proibir imports profundos (`deep imports`) e garantir que features não importem diretamente arquivos internos de outras features.

* **[Dependency Cruiser](https://github.com/sverweij/dependency-cruiser)**
  * *Autor*: Sander Verweij
  * *Tipo*: Ferramenta de Validação e Visualização de Grafo
  * *Relevância*: Validação formal de grafos de dependência e detecção precoce de dependências circulares entre módulos de frontend.

---

## 3. Gerenciamento de Estado & Server State

* **[Practical React Query (TkDodo)](https://tkdodo.eu/blog/practical-react-query)**
  * *Autor*: Dominik Dorfmeister (TkDodo)
  * *Tipo*: Série de Artigos Técnicos
  * *Relevância*: Padrões de co-locação de queries e mutations dentro de features, gerenciamento de chaves (`queryKeyFactory`) e isolamento de contratos de API.
