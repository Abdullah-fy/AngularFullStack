import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {order} from '../_models/order'
import { getData } from './getData.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl="http://localhost:3000/order";

  constructor(private http:HttpClient,private getData: getData){}

  createOrder(Order:order):Observable<any>{
    const httpOptions = new HttpHeaders(this.getData.getAuthHeaders());
    return this.http.post(`${this.apiUrl}/add`,Order,{headers: new HttpHeaders(this.getData.getAuthHeaders())});
  }
}