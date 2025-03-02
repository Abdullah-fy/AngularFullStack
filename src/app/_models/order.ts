export enum PaymentMethod {
    CreditCard = 'credit_card',
    DebitCard = 'debit_card',
    PayPal = 'paypal',
    BankTransfer = 'bank_transfer',
    CashOnDelivery = 'cash_on_delivery'
  }

<<<<<<< HEAD
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

=======
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9
  export interface OrderItem {
    productId: string;
    sellerId: string;
    quantity: number;
    price: number;
    isAvailable?: boolean;
    itemStatus?: 'rejected' | 'pending' | 'approved';
  }
  
  export class order {
    constructor(
      //added items array 
      public _id?:string,
      public items?: OrderItem[],
      public customerId?: string,
      public PhoneNumber?: number, 
      public paymentMethod?: PaymentMethod, 
      public shippingAddress?: string ,
      public CreditCardNumber?:number,
      public ExpiryMonth?:number,
      public ExpiryYear?:number,
      public CVVCode?:number,
      public updatedAt?: Date,
      public orderStatus?: 'pending' | 'shipped' | 'canceled',
      public quantity?: number,
      public price?: number,
      public total?: number

    ) {}
  }
  