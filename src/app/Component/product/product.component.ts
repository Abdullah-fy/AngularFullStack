import { Component } from '@angular/core';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = [
    // {
    //   _id: 1,
    //   name: 'Smartphone',
    //   desc: 'A high-end smartphone with excellent features.',
    //   price: 899,
    //   category: 'Electronics',
    //   img: ["../../../../assets/p-1.jpg"],
    //   stockQuantity: 20,
    //   SellerInfo: {
    //     _id: 123, 
    //     name: "jskshsl"
    //   }
    // },
    
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(data=> {
      this.products = data;
    });
  }

}
