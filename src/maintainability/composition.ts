interface CalculationStrategy {
  calculate(baseAmount: number): number;
}

class TaxCalculationStrategy implements CalculationStrategy {
  constructor(private taxes: number) {}

  calculate(baseAmount: number): number {
    return baseAmount * (1 + this.taxes);
  }
}

class DiscountCalculationStrategy implements CalculationStrategy {
  constructor(
    private discountRate: number,
    private calculation: CalculationStrategy
  ) {}

  calculate(baseAmount: number): number {
    const discountedAmount = baseAmount * (1 - this.discountRate);
    return this.calculation.calculate(discountedAmount);
  }
}

class Invoice {
  private strategy: CalculationStrategy;

  constructor(private baseAmount: number, strategy: CalculationStrategy) {
    this.strategy = strategy;
  }

  calculateTotal(): number {
    return this.strategy.calculate(this.baseAmount);
  }

  printInvoice() {
    const total = this.calculateTotal();
    console.log(`The total invoice amount is: $${total.toFixed(2)}`);
  }
}

const regularInvoiceFactory = ({ baseAmount }: { baseAmount: number }) =>
  new Invoice(baseAmount, new TaxCalculationStrategy(0.2));
const discountedInvoiceFactory = ({
  baseAmount,
  discountRate,
}: {
  baseAmount: number;
  discountRate: number;
}) =>
  new Invoice(
    baseAmount,
    new DiscountCalculationStrategy(
      discountRate,
      new TaxCalculationStrategy(0.2)
    )
  );
const taxInvoiceFactory = ({
  baseAmount,
  taxes,
}: {
  baseAmount: number;
  taxes: number;
}) => new Invoice(baseAmount, new TaxCalculationStrategy(taxes));

const regularInvoice = regularInvoiceFactory({
  baseAmount: 100,
});
regularInvoice.printInvoice();

const discountedInvoice = discountedInvoiceFactory({
  baseAmount: 100,
  discountRate: 0.1,
});
discountedInvoice.printInvoice();

const lowTaxInvoice = taxInvoiceFactory({
  baseAmount: 100,
  taxes: 0.1,
});
lowTaxInvoice.printInvoice();

export {};
