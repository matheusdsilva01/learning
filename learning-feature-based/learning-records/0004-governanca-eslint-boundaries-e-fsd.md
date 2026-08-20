# 0004 - Governança Automatizada, ESLint Boundaries e Comparativo FSD

* **Data**: 2026-08-15
* **Status**: Aprovado
* **Domínio**: Governança Arquitetural / Análise Estática / Especificação FSD

---

## 1. Contexto & O Problema da Erosão Arquitetural
Uma arquitetura Feature-Folder perfeita no papel se degrada em semanas se não houver **enforcement automatizado no CI**. Desenvolvedores sob pressão de prazo atalham fronteiras: fazem deep imports, criam dependências circulares e poluem a camada `shared/` com lógica de negócio.

Sem governança, o grafo de dependências se corrompe silenciosamente e a arquitetura se torna uma ficção documentada que não corresponde ao código real.

---

## 2. Decisões Arquiteturais

### 2.1 TypeScript Path Aliases como Fronteira Semântica
```json
// tsconfig.json (paths)
{
  "compilerOptions": {
    "paths": {
      "@features/*": ["src/features/*"],
      "@entities/*": ["src/entities/*"],
      "@shared/*": ["src/shared/*"],
      "@app/*": ["src/app/*"]
    }
  }
}
```
Os path aliases não são apenas conveniência de importação — são **fronteiras semânticas** que permitem ao linter classificar cada módulo como pertencente a uma camada arquitetural específica.

### 2.2 eslint-plugin-boundaries (Enforcement Primário)
Regras declarativas que proíbem:
1. **Deep Imports**: `@features/cart/components/cart-item` → BLOQUEADO.
2. **Dependências Ascendentes**: `@shared/*` importando `@features/*` → BLOQUEADO.
3. **Dependências Horizontais Não-Públicas**: `@features/checkout` importando internals de `@features/cart` → BLOQUEADO.

### 2.3 Dependency Cruiser (Validação de Grafo e Visualização)
Complementa o ESLint com análise estática de grafo:
- Detecta dependências circulares em qualquer profundidade.
- Gera SVG do grafo real de dependências para auditoria visual.
- Roda no CI como check bloqueante.

### 2.4 Comparativo Feature-Folders Pragmático vs Feature-Sliced Design (FSD)

| Aspecto | Feature-Folders Pragmático | Feature-Sliced Design (FSD) |
| :--- | :--- | :--- |
| **Camadas** | 3 (app/routes, features, shared) | 6 (app, pages, widgets, features, entities, shared) |
| **Rigidez** | Convenção do time + ESLint | Especificação formal com regras estritas por camada |
| **Curva de Adoção** | Baixa-Média | Alta (exige estudo da especificação) |
| **Cenário Ideal** | Times de 2-15 devs, SPAs e apps Next.js | Grandes monorepos corporativos com 20+ devs |
| **Risco** | Erosão sem linting | Overengineering em projetos menores |

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Mitigação |
| :--- | :--- |
| **Violações detectadas em dev-time**: O ESLint acusa erro inline no editor antes mesmo do commit. | Setup inicial de regras `eslint-plugin-boundaries` + path aliases. |
| **CI bloqueante**: PRs com deep imports são rejeitadas automaticamente. | Necessidade de exceções documentadas para casos legítimos raros. |
| **Visualização de grafo**: Dependency Cruiser gera SVG do grafo real de dependências. | Pode ser lento em monorepos muito grandes (mitigável com `.dependency-cruiser.cjs` focado). |
