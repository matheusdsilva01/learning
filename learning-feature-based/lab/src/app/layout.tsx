import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feature Boundaries Lab',
  description: 'Laboratório executável de fronteiras de frontend.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><body><Providers>{children}</Providers></body></html>
}
