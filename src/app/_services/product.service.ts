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
  
  // get filtered products
  getFilteredProducts(category: string, search: string = '', minPrice: number | null = null, maxPrice: number | null = null): Observable<Product[]> {
    let params = new HttpParams();

    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);
    if (minPrice !== null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice !== null) params = params.set('maxPrice', maxPrice.toString());

    return this.http.get<Product[]>(`${this.url}/filteredProducts`, { params });
  }

  //get product by id
  getProductById(id: string) {
    return this.http.get<Product>(`${this.url}/products/${id}`);

  }

  
} 
