import { Component } from '@angular/core';
import { NewArrivalComponent } from "../new-arrival/new-arrival.component";
import { CategoriesComponent } from "../categories/categories.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [NewArrivalComponent, CategoriesComponent, BestSellerComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
