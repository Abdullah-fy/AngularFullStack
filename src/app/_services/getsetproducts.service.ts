import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetsetproductsService {

  constructor() { }

  sellerProducts = signal<any[]>([]);

  setProducts(products: any[]) {
    this.sellerProducts.set(products);
  }

  getProducts() {
    return this.sellerProducts();
  }
}
