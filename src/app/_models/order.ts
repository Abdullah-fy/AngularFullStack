export enum PaymentMethod {
    CreditCard = 'credit_card',
    DebitCard = 'debit_card',
    PayPal = 'paypal',
    BankTransfer = 'bank_transfer',
    CashOnDelivery = 'cash_on_delivery'
  }
  
  export class order {
    constructor(
      public customerId: string,
      public PhoneNumber: number, 
      public paymentMethod: PaymentMethod, 
      public shippingAddress: string 
    ) {}
  }
  