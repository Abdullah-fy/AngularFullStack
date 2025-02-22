import { Component,OnInit,NgModule,ChangeDetectorRef } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import { Product } from '../../_models/product';
import { OrderService } from '../../_services/order.service';
import { order } from '../../_models/order'; 
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-main',
  imports: [FormsModule,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainComponent implements OnInit {
  constructor( private productService:ProductService, private orderService:OrderService,private dialog: MatDialog,private cdr: ChangeDetectorRef){}

  sellerProducts:Product[]=[];

  //change later////
  sellerId='679c85ec89cf48577e8152f4';

  ngOnInit(): void {
      this.loadSellerProduct();
      this.loadSellerOrders(this.sellerId);
      console.log(this.sellerId);
      console.log(this.options); 

      /////
      this.productService.products$.subscribe(products => {
        this.sellerProducts = products;
      });
  }

  loadSellerProduct(){
    this.productService.getProducts().subscribe({
      next:(data)=>{this.sellerProducts=[...data],console.log(data);
        this.cdr.detectChanges();},
      error:(error)=>{console.error('Error loading seller products:', error);}
    }) 
  }

  Deleteproduct(productId:any){
    this.productService.DeleteProduct(productId).subscribe({
      next:()=>this.loadSellerProduct(),
      error:(err)=> console.error('Error removing item from seller product:',err)
    })
  }

   ///////order service///////
   sellerOrders:order[]=[];

  //modal functions
  openDialog(productId:any): void { 
    let isfound=false;
    let DialogMessage;
    this.sellerOrders.forEach(order => {
      order.items?.forEach(item => {
        if(item.sellerId==this.sellerId)
          isfound=true;
      });
    });
    if(isfound)
       DialogMessage='Orders with this product will be cancelled';
    else
      DialogMessage='Are you sure you want to proceed?';

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: DialogMessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //call delete pass product id , 
        this.Deleteproduct(productId);
        //inside delete loop in orders and change items status to rejected
        this.sellerOrders.forEach(order => {
          order.items?.forEach(item => {
            if(item.sellerId==this.sellerId&&item.productId==productId){
              item.itemStatus='rejected'; /////////you are not updating DB!!!! //call updateorder
              this.UpdateItemstate(order._id,item.productId,'rejected');
              //reload/get orders array again 
              this.loadSellerOrders(this.sellerId);

            }
          });
        });
        console.log('User confirmed');
      } else {
        console.log('User canceled');
      }
    });
  }

 

  loadSellerOrders(sellerId:any)
  {
    this.orderService.getorders(sellerId).subscribe({
      next:(data)=>{this.sellerOrders=data,console.log(data)},
      error:(error)=>{console.error('Error loading seller products:', error);}
    })
  }

  UpdateItemstate(orderId:any, productId:any, newStatus:any)
  {
    this.orderService.updateitemstatus(orderId, productId, newStatus).subscribe(response => console.log("update item status service response"+response));
  }

  //
  selectedOption: any = null;
  isDisabled = false;

  options = ['rejected', 'approved'];

  onSelectChange(orderId:any,productId:any,value: string) {
    this.selectedOption = value;
    this.orderService.updateitemstatus(orderId, productId, this.selectedOption).subscribe(response => console.log("update item status service response"+response));
    this.isDisabled = true; // Disable dropdown after selection
  }


  /////////Add product//////
//product dialog 
openFormDialog(): void { 
  const dialogRef = this.dialog.open(FormDialogComponent, {
    width: '440px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadSellerProduct();
      console.log('User confirmed');
    } else {
      console.log('User canceled');
    }
  });
}

  

}
