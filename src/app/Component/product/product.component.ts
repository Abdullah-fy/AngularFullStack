import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../_models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = []; 
  filteredProducts: Product[] = []; 
  
  search: string = '';
  select: string = '1'; 
  minPrice: number | null = null;
  maxPrice: number | null = null;

  categories: { [key: string]: string } = {
    "1": "",
    "2": "forHer",
    "3": "forHim"
  };

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.select = params.get('name') || "1"; 
      if (this.select) {
        this.filterProducts(); 
      } else {
        console.error("Category Name is undefined");
      }
    });
  }

  // get all products
  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProducts(); 
      },
      error: (error) => {
        console.error('Error fetching all products:', error);
      }
    });
  }

  //get filtered products
  filterProducts() {
    const categoryValue = this.categories[this.select] || "";

    this.productService.getFilteredProducts(categoryValue, this.search, this.minPrice, this.maxPrice).subscribe({
      next: (data) => {
        const filteredByCategory = Array.isArray(data) ? data : [];
        this.filteredProducts = filteredByCategory.filter(product => {
          return product.name.toLowerCase().includes(this.search.toLowerCase()); 
        });
      },
      error: (error) => {
        console.error("error: ", error);
        this.filteredProducts = [];
      }
    });
  }

  onSearchChange() {
    this.filterProducts(); 
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
