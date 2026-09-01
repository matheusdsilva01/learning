import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { server } from '@/shared/testing/server'
import { createCartHandlers } from '../testing/handlers'
import { CartWidget } from './cart-widget'

function renderCart() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return render(<CartWidget />, { wrapper: Wrapper })
}

describe('CartWidget', () => {
  it('remove um item confirmado pela API', async () => {
    server.use(...createCartHandlers())
    const user = userEvent.setup()
    renderCart()

    expect(await screen.findByText('Caderno técnico')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remover Caderno técnico' }))

    expect(await screen.findByText('Item removido e confirmado.')).toBeInTheDocument()
    expect(screen.queryByText('Caderno técnico')).not.toBeInTheDocument()
  })

  it('restaura o item quando a API falha', async () => {
    server.use(...createCartHandlers({ deleteFails: true }))
    const user = userEvent.setup()
    renderCart()

    expect(await screen.findByText('Caderno técnico')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remover Caderno técnico' }))

    expect(await screen.findByText('Falha ao remover. O item foi restaurado.')).toBeInTheDocument()
    expect(screen.getByText('Caderno técnico')).toBeInTheDocument()
  })
})
