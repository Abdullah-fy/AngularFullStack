export class Product {
    constructor(public _id: number, public name: string, public desc: string, public price: number, public category: string, public img: string[], public stockQuantity: number, public SellerInfo: {_id: number, name: string}) {}
}