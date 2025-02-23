import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from '../_models/cashierOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/cashier';
  private apiUrl2 = 'http://localhost:3000/cart';


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

  getCart(CashierId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${CashierId}`)
  }

  //remove item from cart
  removeFromCart(customerId:string,productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/remove`, {
      body: { customerId, productId },
    });
  }

  // Decrease item quantity in cart
  decreaseCartItem(customerId:string,productId: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl2}/dec`, {
      customerId,
      productId,
      quantity,
    });
  }

  clearCart(customerId:string): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/clear`, { body: { customerId } });
  }
}
