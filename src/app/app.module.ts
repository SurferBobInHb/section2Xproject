import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { ManageOrdersComponent } from './ana/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './ana/manage-products/manage-products.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { LoginComponent } from './ana/login/login.component';
import { AuthService } from './services/auth.service';
import { fakeBackendProvider } from './utils/helpers/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminAuthGuard } from './ana/guards/AdminAuthGuard';
import { NoAccessComponent } from './ana/messages/no-access/no-access.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { JwtInterceptor } from './interceptors/JwtInterceptor ';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggedInGuard } from './ana/guards/LoggedInGuard';
import { NewProductComponent } from './shopping/new-product/new-product.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductsService } from './services/products.service';
import { ProductCardComponent } from './shopping/product-card/product-card.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { ShippingComponent } from './shopping/shipping/shipping.component';
import { SummaryComponent } from './shopping/summary/summary.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyOrdersComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    NavbarComponent,
    ShoppingCartComponent,
    LoginComponent,
    NoAccessComponent,
    NewProductComponent,
    ProductCardComponent,
    ShoppingCartItemComponent,
    CheckOutComponent,
    ShippingComponent,
    SummaryComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule
  ],
  providers: [
    AuthService,
    RouterModule,
    AdminAuthGuard, 
    LoggedInGuard,
    ProductsService,
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
