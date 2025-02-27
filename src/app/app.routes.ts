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
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MainComponent } from './shared/main/main.component';
import { SellerProductsComponent } from '../app/shared/seller-products/seller-products.component';
import { CashierHomeComponent } from './Component/Cashier/cashier-home/cashier-home.component';
import { SloginComponent } from './auth/slogin/slogin.component';
import { SsignupComponent } from './auth/ssignup/ssignup.component';
import { AuthStaffGuardGuard } from './guard/auth-staff-guard.guard';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/:name', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'Main', component: MainComponent, canActivate: [AuthGuard] },
  {
    path: 'Seller/products',
    component: SellerProductsComponent,
    canActivate: [AuthGuard],
  },

  { path: 'slogin', component: SloginComponent },
  { path: 'ssignup', component: SsignupComponent },
  {
    path: 'cashier/getInventory',
    canActivate: [AuthStaffGuardGuard],
    loadChildren: () =>
      import('./Component/Cashier/Cashier.routes').then((m) => m.default),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
