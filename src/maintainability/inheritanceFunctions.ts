// Base invoice calculation function
function baseInvoice(baseAmount: number): number {
  return baseAmount * 1.2; // Assume a 20% tax rate
}

function discountedInvoice(baseAmount: number, discountRate: number): number {
  const discountedAmount = baseAmount * (1 - discountRate);
  return baseInvoice(discountedAmount);
}

function taxInvoice(baseAmount: number, extraTaxRate: number): number {
  const taxedAmount = baseAmount * (1 + extraTaxRate);
  return baseInvoice(taxedAmount); // This creates a double tax application issue
}

function printInvoice(
  calculateTotal: (amount: number) => number,
  baseAmount: number
) {
  const total = calculateTotal(baseAmount);
  console.log(`The total invoice amount is: $${total.toFixed(2)}`);
}

function baseInvoiceNew(baseAmount: number): number {
  return baseAmount * 1.25;
}

// Demonstrating function use
printInvoice((baseAmount) => baseInvoice(baseAmount), 100); // Outputs: $120.00
printInvoice((baseAmount) => discountedInvoice(baseAmount, 0.1), 100); // Outputs: $108.00
printInvoice((baseAmount) => taxInvoice(baseAmount, 0.3), 100); // Outputs: $156.00

// If we now use baseInvoiceNew, it requires changes in all derived functions
printInvoice((baseAmount) => baseInvoiceNew(baseAmount), 100); // New output should adjust all others

export {};
