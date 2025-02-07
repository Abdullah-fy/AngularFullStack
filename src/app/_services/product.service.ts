import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:3000/seller";

  // list products 
  getAll():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  // get filtered ptoducts
  getFilteredProducts(category: string, minPrice:number | null, maxPrice: number | null) {
    let params = new HttpParams();

    if(category !== "1") {
      params = params.set('category', category);
    }
    if(minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if(maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<any[]>(`${this.url}/filteredProducts`, {params});
  }

} 
