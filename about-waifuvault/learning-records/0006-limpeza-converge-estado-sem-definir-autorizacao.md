# Limpeza converge estado sem definir autorização

O usuário compreendeu que a expiração deve ser aplicada pela rota de leitura, enquanto o cleaner recupera espaço e reconcilia estados independentes do banco e do filesystem. Também distinguiu exclusão idempotente, a heurística baseada em `mtime` e o bloqueio local de uma aquisição distribuída atômica.

## Evidence

Explicou que um blob já ausente não deve interromper o retry que ainda precisa remover o registro e reconheceu que uma transação SQL não desfaz operações no filesystem. Após corrigir a condição de `NX`, concluiu que um segundo container não adquire o lock enquanto o primeiro mantém a chave compartilhada.
