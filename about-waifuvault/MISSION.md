# Missão: compreender e reconstruir um host temporário de arquivos

## Why
Aprender como um serviço real recebe, armazena, entrega e remove arquivos para consolidar conhecimentos de backend. O resultado prático será um host temporário de arquivos implementado em Laravel, inspirado no WaifuVault, mas projetado conscientemente em vez de apenas traduzido.

## Success looks like
- Explicar de ponta a ponta o ciclo de vida de um arquivo no WaifuVault.
- Implementar em Laravel upload privado, acesso por token opaco, expiração e exclusão.
- Aplicar limites, validação de tipo, nomes gerados pela aplicação e rate limiting.
- Demonstrar o comportamento e os casos de falha com testes automatizados.
- Justificar quais funcionalidades do WaifuVault pertencem ao núcleo e quais são extensões.

## Constraints
- Nível atual intermediário em Laravel e backend web.
- Primeiro, os conceitos devem ser analisados no WaifuVault como uma base teórica completa; a prática em Laravel começa somente depois dessa etapa.
- O primeiro alvo é um MVP seguro, não paridade completa com o produto original.
- Fontes primárias e documentação oficial fundamentam as lições.

## Out of scope
- Interface administrativa completa, buckets e álbuns no primeiro MVP.
- Criptografia por senha, antivírus, VirusTotal, thumbnails e geração de ZIP no primeiro MVP.
- Escalabilidade horizontal e armazenamento S3 antes de validar o fluxo local.
