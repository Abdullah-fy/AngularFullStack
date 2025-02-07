import { Component } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { order,PaymentMethod } from '../../_models/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  Order:order=new order("mariam",9999999,PaymentMethod.CashOnDelivery,"");
  paymentMethods = Object.values(PaymentMethod);

  constructor(private orderservice:OrderService){}

  placeOrder(){
    console.log(this.Order);
    this.orderservice.createOrder(this.Order).subscribe({
      next:(data)=>console.log("order created:",data),
      error:(error)=>console.log('error:',error),
    });
  }


}
