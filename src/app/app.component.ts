import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { ProductComponent } from "./Component/product/product.component";

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [HeroComponent, BestSellerComponent, NewArrivalComponent, CategoriesComponent, FooterComponent, ProductComponent],
=======
  imports: [RouterOutlet,FooterComponent],
>>>>>>> 2b21a2b48fe4124e1308e2a2f14a146c62bb1292
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
}
