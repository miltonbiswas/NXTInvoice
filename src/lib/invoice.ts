export function calculateLineTotal(

  quantity: number,
  unitPrice: number,
  taxRate: number,
  discountRate: number

) {

  const subtotal = quantity * unitPrice;

  const discount =
    subtotal * (discountRate / 100);

  const taxed =
    (subtotal - discount) *
    (taxRate / 100);

  return subtotal - discount + taxed;
}