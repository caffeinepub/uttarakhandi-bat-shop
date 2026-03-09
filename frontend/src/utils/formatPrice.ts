export function formatPrice(price: bigint | number): string {
  const numPrice = typeof price === 'bigint' ? Number(price) : price;
  return `₹${numPrice.toLocaleString('en-IN')}`;
}
