type CalculationFunction = (baseAmount: number) => number;

function createTaxCalculation(taxes: number): CalculationFunction {
  return (baseAmount: number) => baseAmount * (1 + taxes);
}

function createDiscountCalculation(
  discountRate: number,
  nextCalculation: CalculationFunction
): CalculationFunction {
  return (baseAmount: number) => {
    const discountedAmount = baseAmount * (1 - discountRate);
    return nextCalculation(discountedAmount);
  };
}

function createInvoice(baseAmount: number, calculation: CalculationFunction) {
  function calculateTotal(): number {
    return calculation(baseAmount);
  }

  function printInvoice() {
    const total = calculateTotal();
    console.log(`The total invoice amount is: $${total.toFixed(2)}`);
  }

  return { calculateTotal, printInvoice };
}

// Factory functions
const regularInvoiceFactory = (baseAmount: number) =>
  createInvoice(baseAmount, createTaxCalculation(0.2));

const discountedInvoiceFactory = (baseAmount: number, discountRate: number) =>
  createInvoice(
    baseAmount,
    createDiscountCalculation(discountRate, createTaxCalculation(0.2))
  );

const taxInvoiceFactory = (baseAmount: number, taxes: number) =>
  createInvoice(baseAmount, createTaxCalculation(taxes));

// Creating invoices
const regularInvoice = regularInvoiceFactory(100);
regularInvoice.printInvoice(); // Outputs: The total invoice amount is: $120.00

const discountedInvoice = discountedInvoiceFactory(100, 0.1);
discountedInvoice.printInvoice(); // Outputs: The total invoice amount is: $108.00

const lowTaxInvoice = taxInvoiceFactory(100, 0.1);
lowTaxInvoice.printInvoice(); // Outputs: The total invoice amount is: $110.00

export {};
