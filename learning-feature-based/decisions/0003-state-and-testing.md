# ADR 0003: ownership de estado e testes

Status: aceito

## Contexto

Estado global indiferenciado mistura ciclos de vida e torna testes dependentes de implementação.

## Decisão

- Interação efêmera fica no componente ou contexto local.
- Estado compartilhável e navegável fica na URL.
- Dados remotos pertencem ao cache do TanStack Query.
- Query keys incluem as variáveis que alteram o resultado.
- Mutations otimistas cancelam refetch concorrente, salvam snapshot, atualizam imutavelmente, revertem no erro e retornam a Promise de invalidação.
- Testes de integração observam comportamento por Testing Library e interceptam HTTP com MSW 2.
- Testes ficam próximos da feature; infraestrutura comum do runner permanece central.

## Consequências

Remover uma feature ainda pode exigir atualizar rotas, E2E e agregadores. Co-localização reduz dispersão, mas não promete deleção atômica.
