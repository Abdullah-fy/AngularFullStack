import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-arrival',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-arrival.component.html',
  styleUrl: './new-arrival.component.css'
})
export class NewArrivalComponent implements OnInit{ 

  products: Product[] = [];
  newArrivals: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() : void {
    this.productService.getAll().subscribe(
      {
        next: (data: Product[]) => {
          this.products = data;
          this.newArrival();
        },
        error : (error) => {
          console.error('error fetching new arrivals: ', error);
        }
      },
    )
  }

  newArrival(): void {
    const currentDate = new Date();
    const days = 30;

    this.newArrivals = this.products.filter(product => {
      const productDate = new Date(product.createdAt);
      const timeDifference = currentDate.getTime() - productDate.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      return daysDifference <= days;
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

}
