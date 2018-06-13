
export function calculateTips(subtotal) {
  return [
    {
      tipPercent: { value: '15%', highlight: true },
      tipTotal: { value: subtotal * 0.15 },
      total: { value: subtotal * 1.15 },
    },
    {
      tipPercent: { value: 0.20, highlight: true },
      tipTotal: { value: subtotal * 0.20 },
      total: { value: subtotal * 1.20 },
    },
  ]
}
