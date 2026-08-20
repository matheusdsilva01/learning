# 0007 - Nomenclatura, Delimitação de Features e o Antipadrão do "Dashboard"

* **Data**: 2026-08-19
* **Status**: Aprovado
* **Domínio**: Arquitetura Frontend / Nomenclatura & Delimitação de Escopo

---

## 1. Contexto & Problema
Ao organizar projetos em Feature-Folders, desenvolvedores frequentemente enfrentam dúvidas sobre a criação de pastas com nomes genéricos como `User`, `Auth`, `Dashboard` e `Settings`.

A falta de critérios claros gera:
1. **O Antipadrão da "Feature Dashboard"**: Tratar uma tela agregadora como se fosse um domínio único, concentrando lógicas não relacionadas de faturamento, métricas e pedidos no mesmo diretório.
2. **Ambiguidade em `User`**: Misturar o modelo transversal de dados do usuário (Entity) com a tela de edição de perfil (`profile`) ou com a gestão administrativa de membros (`user-management`).
3. **A "Pasta Lixeira de Settings"**: Criar um monólito `features/settings` que acumula formulários desconexos em vez de distribuir as configurações em seus respectivos domínios de negócio.

---

## 2. Decisões Arquiteturais

### 2.1 Análise Canônica dos 4 Casos

| Nome | Classificação | Localização Correta | Racional Arquitetural |
| :--- | :---: | :--- | :--- |
| **`Auth`** | ✅ **Feature** | `src/features/auth/` | Domínio fechado com API própria (login, registro, recuperação de senha, refresh token), hooks de sessão e guards. |
| **`User`** | ⚠️ **Entity ou Feature** | `src/entities/user` ou `src/features/profile` | Se for apenas modelo de dados e avatar: **Entity**. Se for o usuário editando seus dados: `features/profile`. Se for painel admin: `features/user-management`. |
| **`Dashboard`** | ❌ **Rota (Página)** | `src/app/(dashboard)/page.tsx` | Dashboard é uma tela orquestradora que compõe widgets de múltiplas features (`billing`, `analytics`, `orders`). Não possui domínio próprio. |
| **`Settings`** | ⚠️ **Rotas de Composição** | `src/app/settings/*/page.tsx` | Dividir configurações em rotas onde cada aba consome sua respectiva feature (`settings/billing` consome `features/billing`). |

---

### 2.2 Estrutura de Harmonia Canônica (Rotas vs Features vs Entities)

```
src/
├── app/                                 # AS ROTAS (PÁGINAS E CENÁRIOS DE MONTAGEM)
│   ├── (auth)/login/page.tsx            # Rota de Login (Thin Route)
│   ├── (dashboard)/
│   │   ├── page.tsx                     # O DASHBOARD (apenas orquestra widgets)
│   │   └── settings/                    # AS TELAS DE CONFIGURAÇÕES
│   │       ├── profile/page.tsx         # Consome @/features/profile
│   │       └── billing/page.tsx         # Consome @/features/billing
│
├── features/                            # OS MÓDULOS DE NEGÓCIO (AÇÕES/FLUXOS)
│   ├── auth/                            # ✅ Login, Token, Sessão
│   ├── profile/                         # ✅ Edição de dados do usuário logado
│   ├── billing/                         # ✅ Faturas, Cartões, Planos
│   ├── team/                            # ✅ Gestão de membros do time
│   └── analytics/                       # ✅ Métricas e gráficos
│
└── entities/                            # MODELOS DE DOMÍNIO TRANSVERSAIS
    └── user/                            # ✅ Tipagem universal User, Avatar
```

---

## 3. Consequências & Trade-offs

| Benefício | Custo / Mitigação |
| :--- | :--- |
| **Eliminação de Monólitos em Settings**: Cada regra de configuração vive junto do seu domínio correspondente (`billing`, `profile`). | Exige organizar as telas de configurações em sub-rotas dedicadas. |
| **Páginas Leves e Focadas**: O Dashboard torna-se um arquivo declarativo de poucas linhas sem regras de negócio embutidas. | Requer que as features exponham componentes de widget ou cards públicos via `index.ts`. |
| **Clareza Semântica**: Nomes de pastas refletem intenções reais de negócio (`profile` vs `user-management` vs `entities/user`). | Exige alinhamento prévio do time sobre o papel de cada pasta. |
