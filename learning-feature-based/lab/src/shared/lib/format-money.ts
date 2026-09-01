export function formatMoney(valueInCents: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(valueInCents / 100)
}
