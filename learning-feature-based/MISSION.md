# Missão: Dominar a Arquitetura Feature-Folder no Frontend

## 1. Contexto & Motivação
Aplicações frontend modernas frequentemente iniciam organizadas por papel técnico (*folders-by-type*: `components/`, `hooks/`, `services/`, `types/`). Conforme o produto e o time escalam, essa estrutura sofre de **Shotgun Surgery** (uma mudança de negócio dispersa por inúmeros diretórios), acoplamento invisível e impossibilidade de deleção limpa de código.

Esta jornada tem como propósito transformar a forma de projetar e manter aplicações frontend reais (foco em **React/Next.js com TypeScript**), aplicando o padrão **Feature-Folder** de forma pragmática, evoluindo para padrões de isolamento avançados, e dominando a governança com linters e regras de fronteira.

---

## 2. Objetivos de Aprendizagem (Skills & Storage Strength)
Ao final desta trilha, o desenvolvedor será capaz de:

1. **Decompor Domínios em Módulos**: Identificar as fronteiras de negócio (Bounded Contexts) e estruturar pastas de features com alta coesão interna (`src/features/<feature-name>`).
2. **Implementar Encapsulamento com Public API**: Utilizar `index.ts` raiz como barreira arquitetural estrita, proibindo *deep imports* e expondo apenas a interface pública da feature.
3. **Desacoplar Dependências Inter-Feature**: Resolver comunicações entre módulos sem dependência circular através de composição visual (Slots/Children), Inversão de Controle e Shared Entities.
4. **Co-localizar Estado e Testes**: Estruturar Server State (TanStack Query), estado local e testes automatizados (Unitários e de Integração) dentro do diretório da feature.
5. **Dominar Thin Routes vs Colocation**: Arquitetar a integração de rotas (Next.js App Router) delegando orquestração para as features.
6. **Automatizar Governança**: Configurar ferramentas de linting (`eslint-plugin-boundaries` / `dependency-cruiser`) para impedir quebra de arquitetura no CI.
7. **Avaliar Trade-offs vs FSD**: Conhecer as diferenças práticas entre o Feature-Folder Pragmático e o Feature-Sliced Design (FSD).

---

## 3. Domínio Prático de Estudo
* **Projeto de Referência**: E-commerce / Marketplace B2C
* **Features de Domínio**:
  * `auth`: Autenticação, sessão e controle de permissões.
  * `catalog`: Listagem, filtros e detalhes de produtos.
  * `cart`: Gaveta do carrinho, cálculos e persistência.
  * `checkout`: Formulários de entrega, pagamento e confirmação.
  * `orders`: Histórico de pedidos e rastreamento.
  * `notifications`: Alertas de estoque e toasts transacionais.

---

## 4. Critérios de Sucesso
- [ ] Conclusão das 4 Lições Interativas no workspace (`lessons/`).
- [ ] Fixação e domínio das regras documentadas no Cheat Sheet (`reference/`).
- [ ] Capacidade de refatorar um projeto estruturado por tipo técnico para Feature-Folders sem regressão.
- [ ] Criação de Learning Records registrando decisões arquiteturais e trade-offs (`learning-records/`).
