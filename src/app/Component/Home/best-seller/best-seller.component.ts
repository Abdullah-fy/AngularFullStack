import { ProductService } from './../../../_services/product.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from '../../../_models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-best-seller',
  imports: [CommonModule, FormsModule],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css'
}) 
export class BestSellerComponent implements OnInit{
  products: Product[] =[];
  bestSellers: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
   this.getAllProducts(); 
  }

  getAllProducts(): void {
    this.productService.getAll().subscribe( {
      next: (data: Product[]) => {
        this.products = data;
        this.bestSeller();
      },
      error: (error) => {
        console.error('error fetching products: ', error);
      }
    });
  }

  bestSeller(): void {
    this.bestSellers = this.products.filter(product => product.isBestSeller || product.salesCount >= 50);
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
