# Entrega HTTP tem marcos distintos

O usuário distinguiu resposta completa, parcial e faixa não satisfazível, além de reconhecer que streaming progressivo evita materializar todo o arquivo em memória. Também compreendeu que o evento `finish` pertence ao lado do servidor e não demonstra download persistido ou visualização pelo cliente.

## Evidence

Classificou corretamente `200`, `206` e `416`, explicando que `416` ocorre quando a faixa solicitada não se encaixa na representação. Ao revisar `finish`, separou a entrega dos bytes das ações posteriores do cliente, como salvar ou visualizar.
