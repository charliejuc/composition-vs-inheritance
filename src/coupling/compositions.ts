interface PaymentMethod {
  processPayment(amount: number): void;
}

class CreditCardProcessor implements PaymentMethod {
  processPayment(amount: number) {
    console.log(`Processing $${amount} payment via Credit Card`);
  }
}

class PayPalProcessor implements PaymentMethod {
  processPayment(amount: number) {
    console.log(`Processing $${amount} payment via PayPal`);
  }
}

class PaymentProcessor {
  constructor(private paymentMethod: PaymentMethod) {}

  process(amount: number) {
    this.paymentMethod.processPayment(amount);
  }
}

const creditPaymentProcessor = new PaymentProcessor(new CreditCardProcessor());
creditPaymentProcessor.process(100); // Processing $100 payment via Credit Card

const paypalPaymentProcessor = new PaymentProcessor(new PayPalProcessor());
paypalPaymentProcessor.process(200); // Processing $200 payment via PayPal

export {};
