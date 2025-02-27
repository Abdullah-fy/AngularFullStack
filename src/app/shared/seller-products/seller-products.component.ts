import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GetsetproductsService } from '../../_services/getsetproducts.service';

@Component({
  selector: 'app-seller-products',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.css'
})
export class SellerProductsComponent {
  
  constructor(private sellerProductsService: GetsetproductsService) {}

  currentPage = 0;
  itemsPerPage = 10;
  searchTerm = '';
  
  get sellerProducts() {
    return this.sellerProductsService.getProducts();
  }

  get filteredProducts() {
    return this.sellerProducts
      .filter(p => 
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice(
        this.currentPage * this.itemsPerPage,
        (this.currentPage + 1) * this.itemsPerPage
      );
  }

  get totalPages() {
    return Math.ceil(this.sellerProducts.length / this.itemsPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  applyFilter() {
    this.currentPage = 0;
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
