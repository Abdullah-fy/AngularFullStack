import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from "./core/header/header.component";
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent,CommonModule,MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Project';
  hideHeaderAndFooter = false;
  hiddenRoutes = ['/cashier/getInventory','/cashier/getInventory/checkout','/Main','/Seller/products','/Main/profile']; // Add all routes where you want to hide header/footer

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderAndFooter = this.hiddenRoutes.includes(event.url);
      }
    });
  }
}
