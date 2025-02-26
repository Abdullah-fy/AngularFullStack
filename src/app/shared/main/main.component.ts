import { Component,OnInit,NgModule,ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import {UpdateStockComponent} from '../update-stock/update-stock.component';
import { MatIconModule } from '@angular/material/icon';
import { 
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SellerAnalysisComponent } from '../seller-analysis/seller-analysis.component';
import {ProfitAnalysisComponent} from '../profit-analysis/profit-analysis.component';
import {OrderStatusAnalysisComponent} from '../order-status-analysis/order-status-analysis.component';
import { GetsetproductsService } from '../../_services/getsetproducts.service';






@Component({
  selector: 'app-main',
  imports: [FormsModule,CommonModule,MatIconModule,RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,MatDialogClose,MatDialogTitle,MatDialogActions,
    SellerAnalysisComponent,
    ProfitAnalysisComponent,
    OrderStatusAnalysisComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainComponent implements OnInit {
  constructor( private productService:ProductService, private orderService:OrderService,private dialog: MatDialog,private cdr: ChangeDetectorRef,private sellerProductsService: GetsetproductsService){}

  sellerProducts:Product[]=[];

  //change later////
  sellerId='679c85ec89cf48577e8152f4';

  ngOnInit(): void {
      this.loadSellerProduct();
      this.loadSellerOrders(this.sellerId);
      console.log(this.sellerId);
      console.log(this.options); 

      this.productService.products$.subscribe(products => {
        this.sellerProducts = products;
      });

      //order anlysis 
      // var ordderanalysis:any[]=this.countApprovedItemsByMonthv(this.sellerOrders);
      // console.log('here');
      
      // console.log('hell'+ordderanalysis);
  }

  
  loadSellerProduct(){
    this.productService.getProducts().subscribe({
      next:(data)=>{this.sellerProducts=[...data],console.log(data);
        this.filteredProducts = [...data];
        this.cdr.detectChanges();
        this.sellerProductsService.setProducts(this.sellerProducts);
      },
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
             // item.itemStatus='rejected'; /////////you are not updating DB!!!! //call updateorder
              this.UpdateItemstate(order.customerId,item.productId,'rejected');
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
      next:(data)=>{this.sellerOrders=data,console.log(data);
        var ordderanalysis=this.countApprovedItemsByMonthv(this.sellerOrders);
        
        // console.log('here',this.countApprovedItemsByMonth(this.sellerOrders));
        // this.monthlySalesData=this.countApprovedItemsByMonth(this.sellerOrders);
        
        console.log('Monthly counts:', JSON.stringify(ordderanalysis, null, 2));
      },
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


//////analysis ///////
//1. orders analysis 
// countApprovedItemsByMonth(orders: order[]) {
//   const monthlyCounts = new Array(12).fill(0);

//   orders.forEach(order => {
//     if (!order.updatedAt) return;
    
//     const orderDate: Date |any = order.updatedAt ? new Date(order.updatedAt) : undefined;
//     if (isNaN(orderDate.getTime())) return;

//     // Only process orders from target year
//     if (orderDate.getFullYear() !== 2025) return;

//     const monthIndex = orderDate.getMonth(); // 0-11 (January-December)
//     const approvedCount = order.items?.filter(
//       item => item.itemStatus === 'approved'
//     ).length;

//     monthlyCounts[monthIndex] += approvedCount;
//   });

//   return monthlyCounts;
// }

///
 countApprovedItemsByMonthv(orders: order[]): { month: string; count: number }[] {
  const monthlyCounts = new Map<string, number>();
  const years = new Set<number>();

  orders.forEach(order => {
    if (!order.updatedAt) return;
    const orderDate: Date |any = order.updatedAt ? new Date(order.updatedAt) : undefined;
    if (isNaN(orderDate.getTime())) return;

    console.log('data'+orderDate);

    const year = orderDate.getFullYear();
    years.add(year);

    const monthKey = `${year}-${(orderDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

      console.log('month'+monthKey);

    const approvedCount:any = order?.items?.filter(
      (item: any) => item.itemStatus === 'approved'
    ).length;

    monthlyCounts.set(monthKey, (monthlyCounts.get(monthKey) || 0) + approvedCount);
  });

  // Generate all months for collected years with proper formatting
  const allMonths: { month: string; count: number }[] = [];
  years.forEach(year => {
    for (let month = 1; month <= 12; month++) {
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      allMonths.push({
        month: monthKey,
        count: monthlyCounts.get(monthKey) || 0
      });
    }
  });

  return allMonths.sort((a, b) => a.month.localeCompare(b.month));
}


//update stock 
openUpdateStockDialog(product: Product): void {
  const dialogRef = this.dialog.open(UpdateStockComponent, {
    data: { currentStock: product.stockQuantity }
  });

  dialogRef.afterClosed().subscribe(updateQty => {
    if (updateQty > 0) {
      this.productService.updateStock(product._id, updateQty).subscribe({
        next: () => this.loadSellerProduct(),
        error: (err) => console.error('Update failed:', err)
      });
    }
  });
} 


//search product
searchTerm: string = '';
filteredProducts: any[] = [];

applyFilter() {
  if (!this.searchTerm) {
    this.filteredProducts = [...this.sellerProducts];
    return;
  }
  
  this.filteredProducts = this.sellerProducts.filter(product => 
    product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}



  ////sslaes analysis data 
  monthlySalesData: number[] = [0,0,1,4,8,0,0,0,1,4,8,10];

}
