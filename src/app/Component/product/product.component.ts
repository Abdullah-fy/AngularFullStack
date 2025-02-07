import { Component } from '@angular/core';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = [];

  search: string = '';
  select: string = '';

  categories: string[] = ['forHim', 'forHer', 'all'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(data=> {
      this.products = data;
      // console.log(data);
    });
  }

  ngOnChanges() {
    console.log("Search Term: ", this.search);
  }

  filterProducts() {
    return this.products.filter(product=> {
      const matchSearch = product.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) ||
      product.description.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());

      const matchCategory = this.select ? product.category === this.select : true;

      return matchSearch && matchCategory;
    });
  }
}
