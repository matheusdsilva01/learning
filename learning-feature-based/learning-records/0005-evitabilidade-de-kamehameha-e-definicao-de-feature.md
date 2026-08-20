# 0005 - Definição Pragmática de Feature e Mitigação do "Código Kamehameha" (Slot Hell)

* **Data**: 2026-08-18
* **Status**: Aprovado
* **Domínio**: Arquitetura Frontend / Fronteiras de Módulo & Composição

---

## 1. Contexto & Problema
Durante a aplicação de Feature-Folders e Inversão de Controle, surgem duas dúvidas arquiteturais críticas:
1. **Onde traçar os limites de uma Feature?**: Quando um conceito de negócio (ex: *Cupons de Desconto*) deve viver dentro de uma feature existente (`cart`) e quando deve ser promovido a uma pasta própria (`src/features/coupons`)?
2. **O Problema do "Código Kamehameha" (Slot Hell)**: Ao tentar desacoplar tudo via props de slot (`headerSlot`, `actionSlot`, `badgeSlot`), o arquivo orquestrador da rota (`page.tsx`) se transforma em uma pirâmide de indentação profunda e ilegível no JSX (`>>>>>>>>`).

---

## 2. Decisões Arquiteturais

### 2.1 Heurística de Definição e Evolução de Feature
Uma feature é definida no padrão clássico como um **mini-aplicativo autossuficiente** (`UI + API + Hooks + Types + Tests`) isolado via `index.ts`.

#### Regra da Evolução em Duas Fases:
* **Fase 1 (Simplicidade / Detalhe Interno)**:
  * Se o recurso é apenas uma ação de interface que altera o estado de outra feature (ex: cupom que apenas faz `POST /api/cart/coupon`), ele vive **100% dentro de `src/features/cart/`**.
  * Validações de negócio (validade, saldo, expiração) pertencem 100% ao Backend.
* **Fase 2 (Promoção a Domínio Próprio)**:
  * Se o negócio expande e cria telas próprias (ex: Carteira de Cupons no Perfil, Checkout 1-Clique, Links de Afiliados), o recurso é promovido para `src/features/coupons/` e passa a exportar componentes dedicados (`CouponWallet`, `CouponInput`, `CouponSelector`).

### 2.2 Mitigação do Código Kamehameha (Slot Hell)
Para manter o desacoplamento sem gerar pirâmides no JSX:

1. **Padrão de Componentes Compostos (Compound Components)**:
   * Estruturar componentes complexos como containers com subcomponentes lineares (`<Card><Card.Actions><AddToCartButton /></Card.Actions></Card>`).
2. **Camada de Widgets / Composers**:
   * Criar blocos integradores intermediários para áreas grandes da tela (ex: `<CatalogProductGrid />`), liberando a `page.tsx` de ter mais de 10 linhas.
3. **Contexto de Escopo Local**:
   * O contêiner provê um contexto React local para que componentes filhos consumam dados sem necessidade de *prop drilling* dentro do slot.
4. **Regra de Ouro do 1 Nível de Slot**:
   * Permitir no máximo 1 nível de injeção de slot. Se um slot exigir outro slot interno em cascata, o conjunto deve ser encapsulado em um Widget.

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Mitigação |
| :--- | :--- |
| **Zero Overengineering Inicial**: O cupom nasce simples dentro do carrinho e só ganha pasta própria quando o negócio exige. | Exige refatoração pontual na Fase 2 para mover arquivos para `features/coupons/`. |
| **JSX Plano e Legível**: Elimina a pirâmide de slots em `page.tsx` mantendo componentes declarativos. | Uso de Compound Components ou criação de Widgets para montagens ricas. |
| **Alta Manutenibilidade**: O código permanece idiomático e compreensível para qualquer desenvolvedor do time. | Disciplina para não abusar de Contexts aninhados. |
