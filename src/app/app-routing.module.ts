import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { LogoutComponent } from './logout/logout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  {path: 'myorders', component: MyOrdersComponent},
  {path: 'manageorders', component: ManageOrdersComponent},
  {path: 'manageproducts', component: ManageProductsComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
