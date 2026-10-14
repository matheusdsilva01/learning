# Validação de upload exige controles em camadas

O usuário distinguiu controle de tamanho, classificação MIME e análise antivírus. Também identificou que aceitar MIME desconhecido em modo fail-open aumenta a superfície de risco e que a alternativa fail-closed é mais conservadora para uma fronteira de upload hostil.

## Evidence

Ao revisar a lição 03, afirmou que a contagem existe “para não exceder o limite permitido pelo servidor”; que “MIME é só para determinar o tipo do arquivo” enquanto o “antivírus verifica se o arquivo é malicioso”; e que “permitir arquivos que ele não conhece pode pôr em risco o sistema”.
