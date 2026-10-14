# Consistência entre banco e storage exige compensação

O usuário identificou que uma falha após gravar os bytes, mas antes de persistir os metadados, cria um blob órfão. Também explicou corretamente que uma transação SQL protege apenas o banco, não desfaz a escrita no filesystem; a próxima etapa deve aprofundar compensação imediata no orquestrador e reconciliação posterior.

## Evidence

Ao responder ao exercício da lição 01, afirmou: “os bytes gravados”; “na de tratamento de erros”; e “a transaction resolveria os metadados no banco, não os bytes gravados”. Isso distingue os dois estados e localiza a necessidade de compensação, ainda que sem nomear inicialmente a camada de orquestração.
