class PaymentProcessor {
  constructor(protected vendorName: string) {}

  processPayment(amount: number) {
    console.log("Common checks");

    switch (this.vendorName) {
      case "CreditCard":
        console.log(`Processing $${amount} payment via Credit Card`);
        break;
      case "PayPal":
        console.log(`Processing $${amount} payment via PayPal`);
        break;
      default:
        throw new Error("Unknown payment processor");
    }

    console.log("Payment post checks");
  }
}

class CreditCardPayment extends PaymentProcessor {
  constructor() {
    super("CreditCard");
  }

  processPayment(amount: number) {
    console.log("Performing credit card specific checks");
    super.processPayment(amount);
  }
}

class PayPalPayment extends PaymentProcessor {
  constructor() {
    super("PayPal");
  }

  processPayment(amount: number) {
    console.log("Performing PayPal specific checks");
    super.processPayment(amount);
  }
}

const creditPayment = new CreditCardPayment();
creditPayment.processPayment(100);

const paypalPayment = new PayPalPayment();
paypalPayment.processPayment(200);

export {};
