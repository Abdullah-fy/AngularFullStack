export enum PaymentMethod {
    CreditCard = 'credit_card',
    DebitCard = 'debit_card',
    PayPal = 'paypal',
    BankTransfer = 'bank_transfer',
    CashOnDelivery = 'cash_on_delivery'
  }

  export interface OrderItem {
    productId: string;
    sellerId: string;
    quantity: number;
    price: number;
    isAvailable: boolean;
  }


  export enum OrderStatus {
    Pending = 'pending',
    Shipped = 'shipped',
    Canceled = 'canceled'
  }

  export interface OrderItem {
    productId: string;
    sellerId: string;
    quantity: number;
    price: number;
    isAvailable: boolean;
    images: [string], 
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
      public Orderstatus?: OrderStatus,
      public items?: OrderItem[],
    ) {}
  }
  