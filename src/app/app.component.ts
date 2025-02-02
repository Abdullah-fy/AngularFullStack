import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from "./Component/Home/hero/hero.component";
import { BestSellerComponent } from "./Component/Home/best-seller/best-seller.component";
import { NewArrivalComponent } from "./Component/Home/new-arrival/new-arrival.component";
import { CategoriesComponent } from "./Component/Home/categories/categories.component";
import { FooterComponent } from "./core/footer/footer.component";
import { ProductComponent } from "./Component/product/product.component";

@Component({
  selector: 'app-root',
  imports: [HeroComponent, BestSellerComponent, NewArrivalComponent, CategoriesComponent, FooterComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
}
