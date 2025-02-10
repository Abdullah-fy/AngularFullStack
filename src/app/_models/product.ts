export class Product {
    constructor(
        public _id: number, 
        public name: string, 
        public description : string, 
        public price: number, 
        public category: string, 
        public images: [string], 
        public stockQuantity: number, 
        public SellerInfo: {_id: number, name: string}) {}
} 