class Invoice {
  constructor(protected baseAmount: number) {}

  calculateTotal(): number {
    return this.baseAmount * 1.2; // assuming a 20% tax rate
  }

  printInvoice() {
    const total = this.calculateTotal();
    console.log(`The total invoice amount is: $${total.toFixed(2)}`);
  }
}

class DiscountedInvoice extends Invoice {
  constructor(baseAmount: number, private readonly discountRate: number) {
    super(baseAmount);
  }

  calculateTotal(): number {
    // Applying a discount before adding tax
    const discountedAmount = this.baseAmount * (1 - this.discountRate);
    return discountedAmount * 1.2;
  }
}

class TaxInvoice extends Invoice {
  taxRate: number;

  constructor(baseAmount: number, taxRate: number) {
    super(baseAmount);
    this.taxRate = taxRate;
  }

  calculateTotal(): number {
    return this.baseAmount * (1 + this.taxRate);
  }
}

const regularInvoice = new Invoice(100);
regularInvoice.printInvoice(); // Outputs: The total invoice amount is: $120.00

const discountedInvoice = new DiscountedInvoice(100, 0.1); // 10% discount
discountedInvoice.printInvoice(); // Outputs: The total invoice amount is: $108.00

const taxInvoice = new TaxInvoice(100, 0.3); // 30% tax rate
taxInvoice.printInvoice(); // Outputs: The total invoice amount is: $130.00
