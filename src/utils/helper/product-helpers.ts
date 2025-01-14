export function calculateDiscountedPrice(amount: number, percent: number) {
  // Convert discount percentage to decimal
  const discountDecimal = percent / 100;

  // Calculate discounted price
  const discountedPrice = amount - amount * discountDecimal;

  // Return discounted price
  return discountedPrice;
}
