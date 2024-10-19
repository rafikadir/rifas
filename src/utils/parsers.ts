export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}


export const JSONDataParser = (data: unknown) => {
  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  return JSON.parse(JSON.stringify(data, null, 2));
};