import { ProductsService } from './products.service';
import { ShoppingCartComponent } from '../shopping/shopping-cart/shopping-cart.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subject, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../models/shopping-cart';
import { ApiResponse } from '../shopping/new-product/new-product.component';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { ShippingInfo } from '../models/shipping-info';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient)  { 
  }

  submitOrder(shippingInfo: ShippingInfo, shoppingCart: ShoppingCart) {
    let order: Order = {customer: shippingInfo.name, id: shoppingCart.id.toString(), date: '', cart: shoppingCart, shippingInfo: shippingInfo};
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let orderUrl = environment.apiUrl + "angular/order/create";
    return this.http.post(orderUrl, order, {headers});
  }

  getOrders(nameToFilterOn?: string) : Observable<Order []> {
    let productUrl = environment.apiUrl + "angular/orders";
    if (nameToFilterOn)
      productUrl += "/" + nameToFilterOn;
    return this.http.get<Order []>(productUrl);
  } 

}
