# Notas & Decisões Consolidadas do Usuário

## 1. Perfil & Diretrizes do Workspace
* **Stack Principal**: React / Next.js com TypeScript.
* **Server State**: TanStack Query + URL State + Context/Zustand leve.
* **Abordagem**: Feature-Folders Pragmático (focado em domínio, sem a sobrecarga das 6 camadas do FSD para projetos médios).

---

## 2. Insights & Acordos Arquiteturais dos Debates

### Como Definir uma Feature
* Uma feature é um **mini-aplicativo de negócio fechado** (`UI + API + Hooks + Types + Tests`) isolado via `index.ts`.
* **Teste da Deleção**: Se deletar a pasta, o restante do app não quebra de forma imprevisível.
* **Regra do Cupom**:
  * *Fase 1 (Simples)*: Cupom é apenas um input no carrinho que faz `POST /api/cart/coupon`. Vive dentro de `src/features/cart/`. As validações de negócio pertencem 100% ao backend.
  * *Fase 2 (Evolução de Domínio)*: Se o negócio criar tela de Carteira de Cupons no Perfil e Checkout 1-Clique, o cupom é promovido para `src/features/coupons/` e exporta `CouponWallet`, `CouponInput` e `CouponSelector`.

### Nomenclatura & Delimitação Canônica
* **`Auth`**: ✅ Feature canônica (Login, Registro, Sessão, Tokens).
* **`User`**: ⚠️ Modelo transversal = Entity (`entities/user`). Edição pelo usuário = `features/profile`. Gestão administrativa = `features/user-management`.
* **`Dashboard`**: ❌ É ROTA/PÁGINA (`app/(dashboard)/page.tsx`), não feature. Apenas orquestra widgets de outras features.
* **`Settings`**: ⚠️ Dividir em sub-rotas consumindo suas respectivas features (`settings/billing` consome `features/billing`).

### O Teste de Deleção e o Blast Radius (Raio de Explosão)
* O teste de deleção **não** significa "apagar e nada quebrar como mágica".
* Significa **ter previsibilidade total do que vai quebrar**: zero código órfão deixado para trás e apenas 1 ou 2 erros claros do TypeScript nos pontos exatos de consumo da Public API.

### Como Evitar o "Código Kamehameha" (Slot Hell no JSX)
* O uso excessivo de slots nomeados em `page.tsx` cria pirâmides profundas de indentação (`>>>>>>>>`).
* **Mitigações**:
  1. *Compound Components*: Estrutura linear e plana (`<Card><Card.Actions><Button /></Card.Actions></Card>`).
  2. *Camada de Widgets/Composers*: Criar blocos integradores intermediários para blindar a `page.tsx`.
  3. *Contexto de Escopo Local*: Componentes filhos leem dados via hook sem prop drilling de slots.
  4. *Regra do 1 Nível de Slot*: Nunca aninhar mais de 1 nível de slot em cascata.

### Pirâmide de Testes Co-localizados
* **Testes Unitários**: Hooks puros de cálculo (`use-cart-calculations.test.ts`).
* **Testes de Integração**: Componentes de container com MSW (`cart-drawer.test.tsx` + `testing/handlers.ts`).
* **Testes E2E**: Na raiz `/e2e` cobrindo fluxos transacionais completos.
* **Deleção Atômica de Testes**: Ao deletar a feature, 100% dos testes e mocks morrem junto sem quebrar o CI.
