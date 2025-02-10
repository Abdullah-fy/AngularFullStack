import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { order,PaymentMethod } from '../../_models/order';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-order',
  imports: [FormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})


export class OrderComponent implements OnInit{
  //iterate of mounth and year
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: string[] = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

  //static is
  _id="johndoe@example.com";
  Name:any;

  //select payment method
  selectPaymentMethod(method: PaymentMethod) {
    this.Order.paymentMethod = method;
  }

  //create obj
  Order:order=new order("67a92c4db4bab0f09cbd40c3");
  paymentMethod=PaymentMethod;
  
  constructor(private orderservice:OrderService,private user:UserService){}
  ngOnInit(): void {
    this.getbyId();
  }

  placeOrder(){
    this.orderservice.createOrder(this.Order).subscribe({
      next:(data)=>console.log("order created:",data),
      error:(error)=>console.log('error:',error),
    });
  }

  getbyId(){
      this.user.getById(this._id).subscribe({
        next:(data)=>this.Name=data.firstName+" "+data.lastName,
        error:(error)=>console.log(error.message)
      })
  }

  


}
