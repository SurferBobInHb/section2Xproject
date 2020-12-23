import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { LoginComponent } from './ana/login/login.component';
import { AdminAuthGuard } from './ana/guards/AdminAuthGuard';
import { NoAccessComponent } from './ana/messages/no-access/no-access.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ana/login', component: LoginComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AdminAuthGuard]},
  {path: 'manage-products', component: ManageProductsComponent, canActivate: [AdminAuthGuard]},
  {path: 'no-access', component: NoAccessComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
