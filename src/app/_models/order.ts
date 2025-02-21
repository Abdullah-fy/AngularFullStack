export enum PaymentMethod {
    CreditCard = 'credit_card',
    DebitCard = 'debit_card',
    PayPal = 'paypal',
    BankTransfer = 'bank_transfer',
    CashOnDelivery = 'cash_on_delivery'
  }
  
  export class order {
    constructor(
      public customerId?: string,
      public PhoneNumber?: number, 
      public paymentMethod?: PaymentMethod, 
      public shippingAddress?: string ,
      public CreditCardNumber?:number,
      public ExpiryMonth?:number,
      public ExpiryYear?:number,
      public CVVCode?:number,
      public orderStatus?: 'pending' | 'shipped' | 'canceled',
      public quantity?: number,
      public price?: number,
      public total?: number
    ) {}
  }
  