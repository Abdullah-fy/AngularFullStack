import { ProductComponent } from './Component/product/product.component';
import { Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { HomeComponent } from './Component/Home/home/home.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component:HomeComponent},  
    { path: 'cart', component:CartComponent},  
    { path: "user", component:UserProfileComponent},
    {path: "products", component:ProductComponent}
];
