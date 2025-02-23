import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from '../_models/cashierOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/cashier';

  constructor(private http: HttpClient) {}

  createOrder(Order: order): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, Order);
  }

  getAllOrders(filters: any = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllOrders`, { params: filters });
  }

  getOrderByCashierId(cashierId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/getOrders/${cashierId}`)
  }

  getCashier(cashierId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/getCashier/${cashierId}`)
  }

  getInventory(branchId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/getInventory/${branchId}`);
  }

  addToCart(CasherId:string,productId:string,quantity:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtocart`,{CasherId,productId,quantity});
  }
}
