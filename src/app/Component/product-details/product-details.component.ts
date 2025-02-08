import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  products: Product[] = [];

  constructor(private ProductService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }


}
