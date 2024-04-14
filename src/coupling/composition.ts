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

interface CheckBalance {
  isEnoughBalance(): boolean;
}

class CreditCardCheckBalance implements CheckBalance {
  isEnoughBalance() {
    console.log("Checking credit card balance");
    return true;
  }
}

class PaypalCheckBalance implements CheckBalance {
  isEnoughBalance() {
    console.log("Checking PayPal balance");
    return true;
  }
}

class StrangePaypalCheckBalance implements CheckBalance {
  isEnoughBalance() {
    console.log("Checking Strange PayPal balance");
    return false;
  }
}

class PaymentProcessor {
  constructor(
    private paymentMethod: PaymentMethod,
    private checkBalance: CheckBalance
  ) {}

  process(amount: number) {
    if (!this.checkBalance.isEnoughBalance()) {
      throw new Error("Insufficient balance");
    }

    this.paymentMethod.processPayment(amount);
  }
}

const creditPaymentProcessor = new PaymentProcessor(
  new CreditCardProcessor(),
  new CreditCardCheckBalance()
);
creditPaymentProcessor.process(100); // Processing $100 payment via Credit Card

const paypalPaymentProcessor = new PaymentProcessor(
  new PayPalProcessor(),
  new StrangePaypalCheckBalance()
);
paypalPaymentProcessor.process(200); // Processing $200 payment via PayPal

export {};
