import { NewProductComponent } from './shopping/new-product/new-product.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ManageOrdersComponent } from './ana/manage-orders/manage-orders.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './ana/manage-products/manage-products.component';
import { LoginComponent } from './ana/login/login.component';
import { AdminAuthGuard } from './ana/guards/AdminAuthGuard';
import { NoAccessComponent } from './ana/messages/no-access/no-access.component';
import { LoggedInGuard } from './ana/guards/LoggedInGuard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ana/login', component: LoginComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [LoggedInGuard]},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [LoggedInGuard]},
  {path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AdminAuthGuard]},
  {path: 'manage-products', component: ManageProductsComponent, canActivate: [AdminAuthGuard]},
  {path: 'new-product/:id', component: NewProductComponent, canActivate: [AdminAuthGuard]},
  {path: 'no-access', component: NoAccessComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
