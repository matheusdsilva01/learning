# 0001 - Transição de Folders-by-Type para Feature-Folders

* **Data**: 2026-08-15
* **Status**: Aprovado
* **Domínio**: Arquitetura Frontend / Organização de Código

---

## 1. Contexto & Problema
Em projetos organizados por tipo técnico (`src/components/`, `src/hooks/`, `src/services/`), cada modificação em uma regra de negócio (ex: *Carrinho de Compras*) exige que o desenvolvedor alterne entre múltiplos diretórios distantes. Isso gera o sintoma de *Shotgun Surgery*, aumenta o acoplamento inadvertido entre partes não relacionadas do sistema e inviabiliza a deleção segura de funcionalidades legadas.

---

## 2. Decisão Arquitetural
Adotar o padrão **Feature-Folders Pragmático**, onde:
1. Cada funcionalidade de negócio reside em seu próprio diretório isolado sob `src/features/<feature-name>`.
2. Toda a lógica específica da feature (componentes visuais, hooks, queries TanStack, tipos e slices de estado) é co-localizada dentro dessa pasta.
3. A comunicação com o restante da aplicação ocorre exclusivamente através do arquivo `src/features/<feature-name>/index.ts` (Public API).
4. Diretórios globais (`src/components/`, `src/lib/`, `src/utils/`) são reservados estritamente para primitivos reutilizáveis de design system e utilitários de infraestrutura agnósticos a regras de negócio.

---

## 3. Consequências & Trade-offs

### Impactos Positivos
* **Alta Coesão**: Todos os artefatos de uma funcionalidade estão centralizados em um único local.
* **Deleção Atômica**: Remover uma feature requer apenas apagar a pasta correspondente e desconectar sua rota.
* **Redução de Carga Cognitiva**: Desenvolvedores trabalham com escopo delimitado sem poluir namespaces globais.

### Desafios & Mitigações
* **Risco de Deep Imports**: Desenvolvedores podem tentar importar arquivos privados de outras features.
  * *Mitigação*: Configuração de linting com `eslint-plugin-boundaries` e TypeScript path aliases.
* **Dúvida sobre Compartilhamento Prematuro**: Tendência a mover componentes para `shared/` cedo demais.
  * *Mitigação*: Aplicação da "Regra de Três" — código só sobe para a camada compartilhada quando utilizado por 3 features distintas.
