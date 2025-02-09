import { ProductComponent } from './Component/product/product.component';
import { Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { HomeComponent } from './Component/Home/home/home.component';
import { OrderComponent } from './Component/order/order.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path: 'home', component:HomeComponent},  
    {path: 'cart', component:CartComponent},  
    {path:'order',component:OrderComponent}
    {path: "user", component:UserProfileComponent},
    {path: "products", component:ProductComponent},
    {path: "products/:name", component:ProductComponent},
    {path: "product/:id", component:ProductDetailsComponent}

];
