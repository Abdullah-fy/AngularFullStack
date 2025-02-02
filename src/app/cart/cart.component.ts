import { Component, OnInit } from '@angular/core';
import { CartService } from '../_service/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  customerId: string = 'yasoo'; //change later

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  //load cart item
  loadCart(): void {
    this.cartService.getCart(this.customerId).subscribe({
      next: (data) => {this.cartItems = data.items},
      error:(error)=>{console.error('Error loading cart:',error)}
    });
  };

  //Add item to cart
  addToCart(productId:string,quantity:number=1):void{
    this.cartService.addToCart(this.customerId,productId,quantity).subscribe({
      next:()=>this.loadCart(),
      error:(err)=> console.error('error adding item to cart:',err),
    })
  };

  //reomve from cart
  removeFromCart(productId:string):void{
    this.cartService.removeFromCart(this.customerId,productId).subscribe({
      next:()=>this.loadCart(),
      error:(err)=> console.error('Error removing item from cart:',err)
    })
  };

  //decrese item quantity in cart
  decreaseCartItem(productId:string,quantity:number=1):void{
    this.cartService.decreaseCartItem(this.customerId,productId,quantity).subscribe({
      next: ()=> this.loadCart(),
      error:(err)=> console.error("Error decreasing item quantity:",err) 
    })
  }

  //clear the entire cart when checkout
  clearCart():void{
    this.cartService.clearCart(this.customerId).subscribe({
      next:()=>{this.cartItems=[]},
      error:(err)=> console.error('Error cleaning cart:',err)
    })
  };

}
