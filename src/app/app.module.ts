import { RouterModule } from '@angular/router';
// import { JwtHelper } from 'angular2-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { ManageOrdersComponent } from './ana/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './ana/manage-products/manage-products.component';
import { FormsModule } from '@angular/forms';
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
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    RouterModule,
    AdminAuthGuard, 

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
