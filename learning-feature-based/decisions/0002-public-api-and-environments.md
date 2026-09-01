# ADR 0002: APIs públicas e ambientes

Status: aceito

## Contexto

Uma única barrel pode expor detalhes demais e, no App Router, levar código exclusivo do servidor ao grafo cliente.

## Decisão

- Exports públicos são explícitos; `export *` não é o padrão.
- `index.ts` contém contratos universais ou seguros para consumidores client.
- `index.server.ts` expõe loaders, Server Components ou acesso a dados marcados com `server-only`.
- Consumidores externos não importam subpastas internas.
- ESLint e Dependency Cruiser validam o destino resolvido; o arquivo de índice sozinho é apenas uma convenção.

## Consequências

O contrato fica pesquisável e reduz contaminação entre ambientes. O custo é manter entradas adicionais quando um módulo atende aos dois grafos.
