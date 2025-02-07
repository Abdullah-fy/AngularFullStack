import { Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { HomeComponent } from './Component/Home/home/home.component';
import { OrderComponent } from './Component/order/order.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component:HomeComponent},  
    { path: 'cart', component:CartComponent},  
    {path:'order',component:OrderComponent}
];
