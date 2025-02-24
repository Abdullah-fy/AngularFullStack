import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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


  //Era product sevice
  private apiUrl="http://localhost:3000/seller";
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  getProducts():Observable<any>{
    return this.http.get(`${this.apiUrl}/products`, {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      params: { '_t': Date.now() } // Cache buster
    }).pipe(
      tap(data => this.productsSubject.next(data as Product[]))
    );
  }

  DeleteProduct(productId:any)
  {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(() => this.getProducts().subscribe()) // Refresh list after addition
    );
  }

  //update product stock
  updateStock(productId: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${productId}/stock`, { quantity });
  }

  
} 
