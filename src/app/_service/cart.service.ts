import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl="http://localhost:3000/cart";

  constructor(private http:HttpClient) { }

  //get header from here write it later to get id from token

  //add item to cart
  addToCart(customerId:string,productId:string,quantity:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/add`,{customerId,productId,quantity});
  }

  //get cart item
  getCart(customerId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${customerId}`);
  }

  //remove item from cart
  removeFromCart(customerId:string,productId:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/remove`,{body:{customerId,productId}})
  } 

  // Decrease item quantity in cart
  decreaseCartItem(customerId:string,productId:string,quantity:number):Observable<any>{
    return this.http.patch(`${this.apiUrl}/dec`,{customerId, productId, quantity })
  }

  clearCart(customerId:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/clear`,{body:{customerId}});
  }

}
