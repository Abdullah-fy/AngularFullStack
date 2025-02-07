import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  product: boolean = false;

  private url: string = "http://localhost:9797/seller/products";

  //list products 
  getAll():Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
} 
