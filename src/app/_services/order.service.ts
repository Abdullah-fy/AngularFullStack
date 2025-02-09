import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {order} from '../_models/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl="http://localhost:3000/order";

  constructor(private http:HttpClient){}

  createOrder(Order:order):Observable<any>{
    return this.http.post(`${this.apiUrl}/add`,Order);
  }
}