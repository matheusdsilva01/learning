import { deleteCartItem } from '@/features/cart/index.server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ itemId: string }> },
) {
  const { itemId } = await params
  return Response.json(deleteCartItem(itemId))
}
