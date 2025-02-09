import { ProductComponent } from './Component/product/product.component';
import { Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { HomeComponent } from './Component/Home/home/home.component';
import { OrderComponent } from './Component/order/order.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path: 'home', component:HomeComponent},  
    {path: 'cart', component:CartComponent, canActivate: [AuthGuard]},  
    {path:'order',component:OrderComponent},
    {path: "user", component:UserProfileComponent},
    {path: "products", component:ProductComponent},
    {path: "products/:name", component:ProductComponent},
    {path: "product/:id", component:ProductDetailsComponent},
    { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

];
