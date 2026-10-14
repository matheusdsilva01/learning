# Storage privado exige entrega mediada pela aplicação

O usuário explicou que um arquivo não deve ser entregue diretamente pelo filesystem ou servidor web. A requisição precisa passar pela aplicação para preservar controles de existência, expiração, senha, autorização e rate limiting.

## Evidence

Ao revisar a lição 02, afirmou: “o arquivo só é entregue pela aplicação nunca direto pelo filesystem”. Também enumerou os controles que seriam contornados se o diretório de uploads fosse público: “existência, expiração, senha, autorização, rate limit”.
