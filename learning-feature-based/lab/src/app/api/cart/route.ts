import { readCart } from '@/features/cart/index.server'

export async function GET() {
  return Response.json(readCart())
}
