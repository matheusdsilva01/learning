# Notas do workspace

## Preferências de aprendizagem

- Explicações em português técnico, com o termo original em inglês apenas na primeira ocorrência.
- Exemplos pequenos, executáveis e ligados ao mesmo domínio de e-commerce.
- Uma decisão observável por lição.
- Recuperação antes da explicação e nova tentativa depois do feedback.
- Sem alegações de domínio sem teste, exercício ou justificativa produzida pelo aprendiz.

## Política adotada

- `app` compõe features; uma feature não importa outra feature.
- Features podem importar entidades e código compartilhado.
- Uma API pública organiza o contrato, mas o linter e o grafo fazem o enforcement.
- Código exclusivo do servidor usa uma entrada explícita, como `index.server.ts`.
- O backend é autoritativo; validação no cliente continua útil para feedback e redução de requisições inválidas.
- Co-localização reduz dispersão, mas não garante deleção atômica nem blast radius fixo.

## Questões para revisitar

- Quando um composer reutilizado merece uma camada própria (`widgets/` ou `composers/`)?
- Quando separar uma capacidade ampla, como `cart`, em operações menores compensa o custo de coordenação?
- Que exceções de importação o domínio real exige e como torná-las auditáveis?
