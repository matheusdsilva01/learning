# 0006 - Previsibilidade do Raio de Explosão (Blast Radius) e Estratégia de Testes Co-localizados com MSW

* **Data**: 2026-08-18
* **Status**: Aprovado
* **Domínio**: Qualidade de Software / Testes Automatizados / Deletabilidade

---

## 1. Contexto & Problema
Dois problemas recorrentes em grandes aplicações frontend são:
1. **O Mito do "Deletou e nada quebrou"**: Desenvolvedores assumem que a deleção de uma feature não deve causar nenhum erro de compilação. Quando tentam alcançar isso a todo custo, criam camadas excessivas de indireção.
2. **Separação de Testes em Raiz Monolítica (`/tests`)**: Manter testes, mocks e fixtures longe do código fonte da feature gera código de teste órfão, dificulta o refactor e quebra o CI quando módulos são movidos.

---

## 2. Decisões Arquiteturais

### 2.1 O Conceito de Blast Radius (Raio de Explosão Previsível)
O objetivo do **Teste de Deleção** no Feature-Folder não é fazer o código compilar magicamente sem o módulo, mas sim:
1. **Garantir Zero Código Órfão**: Ao apagar a pasta `src/features/<nome>/`, 100% dos seus componentes, hooks, queries, tipos e testes morrem juntos.
2. **Previsibilidade Total de Erro**: Os únicos erros que ocorrem são nos pontos exatos e finitos de consumo da Public API (ex: 1 linha na `page.tsx`).
3. **TypeScript como Guia de Limpeza**: A lista de erros do compilador indica exatamente onde desconectar os cabos em menos de 1 minuto.

### 2.2 Pirâmide de Testes Co-localizados com MSW
A estrutura de testes divide-se estritamente em:

1. **Testes Unitários Puros (`*.test.ts`)**:
   - Co-localizados ao lado de hooks e utilitários da feature (`use-cart-calculations.test.ts`).
   - Testam cálculos, transformações e estados sem interface gráfica.
2. **Testes de Integração da Feature (`*.test.tsx`) com MSW**:
   - Co-localizados ao lado de componentes containers (`cart-drawer.test.tsx`).
   - Mocks de rede HTTP definidos isoladamente dentro da feature (`testing/handlers.ts` e `testing/fixtures.ts`).
   - O servidor global de testes (`src/testing/server.ts`) apenas agrega os handlers de cada feature.
   - Utilização de `createTestQueryClientWrapper()` para criar instâncias isoladas de cache por teste.
3. **Testes E2E (Playwright / Cypress)**:
   - Residem na raiz `/e2e` por cobrirem jornadas completas de usuário através de múltiplas rotas e features.

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Mitigação |
| :--- | :--- |
| **Eliminação de Testes Zumbis**: Deletar a feature apaga automaticamente seus testes e mocks. | Testes não ficam centralizados em uma pasta `/tests` única (requer regex de busca no runner). |
| **Testes Rápidos e Confiáveis**: MSW intercepta em memória (Node.js) testando o fluxo real de UI + API. | Necessidade de manter `fixtures.ts` atualizados com os contratos do backend. |
| **Segurança na Refatoração**: Mudanças internas na feature não quebram testes de outras features. | Configuração inicial de `setupServer` com MSW e wrapper do TanStack Query. |
