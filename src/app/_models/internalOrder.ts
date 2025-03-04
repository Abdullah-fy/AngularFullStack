export interface Product {
    productId: string;
    quantity: number;
  }
  
  export interface internalOrder {
    id:string;
    branchId: string;
    requestedBy: string;
    status: 'Pending' | 'Approved';
    products: Product[];
    createdAt?: Date;
    updatedAt?: Date;
  }