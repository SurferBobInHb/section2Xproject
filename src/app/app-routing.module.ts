import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { LogoutComponent } from './logout/logout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { LoginComponent } from './ana/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ana/login', component: LoginComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'manage-orders', component: ManageOrdersComponent},
  {path: 'manage-products', component: ManageProductsComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
