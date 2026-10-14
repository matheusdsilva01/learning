# File Hosting e WaifuVault Resources

## Knowledge

- [WaifuVault source code at commit 5f5e94b](https://github.com/waifuvault/WaifuVault/tree/5f5e94b87abba950670648d962432eceec26588c)
  Fonte primária do sistema estudado. Use para: rastrear fluxos reais, contratos HTTP, persistência, segurança e operação.
- [WaifuVault README](https://github.com/waifuvault/WaifuVault/blob/5f5e94b87abba950670648d962432eceec26588c/README.md)
  Descreve funcionalidades, configuração e topologia de deploy. Use para: comparar comportamento prometido com implementação.
- [WaifuVault public API documentation](https://waifuvault.moe/api-docs)
  Contrato publicado da API em execução. Use para: observar entradas, respostas e códigos HTTP; confirme detalhes no código fixado.
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
  Guia de defesa em profundidade para upload. Use para: nomes, extensões, MIME, limites, storage, permissões e malware.
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
  Guia para restringir requisições iniciadas pelo servidor. Use para: avaliar upload por URL sem permitir acesso arbitrário à rede interna.
- [Laravel 13: File Storage](https://laravel.com/docs/13.x/filesystem)
  Documentação oficial de discos, streaming, uploads, URLs, exclusão e testes com storage falso.
- [Laravel 13: HTTP Responses](https://laravel.com/docs/13.x/responses)
  Documentação oficial de respostas de arquivo, download e streaming. Use para: implementar a entrega controlada pelo Laravel.
- [Laravel 13: Task Scheduling](https://laravel.com/docs/13.x/scheduling)
  Documentação oficial do scheduler e locks. Use para: limpeza de expirados sem sobreposição ou duplicação entre servidores.
- [Pest 5 Documentation](https://pestphp.com/docs)
  Documentação oficial do test runner escolhido para a réplica. Use para: testes funcionais, expectativas, datasets e isolamento.
- [Node.js Crypto: Hash](https://nodejs.org/api/crypto.html#class-hash)
  Documentação oficial de hashes incrementais com `update()` e `digest()`. Use para: compreender o cálculo do checksum por chunks no WaifuVault.
- [RFC 6151: MD5 Security Considerations](https://www.rfc-editor.org/rfc/rfc6151)
  Análise da IETF sobre os limites do MD5. Use para: distinguir comparação operacional de uma garantia que exige resistência a colisões.
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
  Orientação sobre logs de segurança e dados que não devem ser registrados diretamente. Use para: evitar vazamento de tokens, sessões, senhas e chaves por observabilidade.
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
  Especificação primária de métodos, status, metadados, validadores e requisições condicionais e parciais.
- [MDN: HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)
  Explicação prática de `Range`, `206`, `Content-Range` e `416`. Use para: streaming de áudio e vídeo em uma etapa posterior.

## Wisdom (Communities)

- [WaifuVault GitHub Discussions](https://github.com/waifuvault/WaifuVault/discussions)
  Canal do próprio projeto. Use para: confirmar intenções de design e perguntar sobre trade-offs observados no código.
- [Laravel GitHub Discussions](https://github.com/laravel/framework/discussions)
  Comunidade técnica ligada ao framework. Use para: validar comportamentos específicos do Laravel e do filesystem.
- [Laravel.io Forum](https://laravel.io/forum)
  Comunidade moderada de praticantes. Use para: discutir decisões da réplica depois de apresentar código e testes reproduzíveis.

## Gaps

- Ainda falta uma fonte primária específica sobre operação segura de ClamAV; ela só será pesquisada quando antivírus entrar no escopo.
- Ainda falta escolher e documentar o storage de produção; o MVP usa disco local privado.
