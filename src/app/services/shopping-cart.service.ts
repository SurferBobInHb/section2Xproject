import { ProductsService } from './products.service';
import { ShoppingCartComponent } from './../shopping/shopping-cart/shopping-cart.component';
import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subject, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../models/shopping-cart';
import { ApiResponse } from '../shopping/new-product/new-product.component';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
   public shoppingCartChanged : Subject<ShoppingCart>;

  shoppingCart: ShoppingCart;

  constructor(private http: HttpClient, private productsService: ProductsService)  { 
    this.loadCart();
    this.shoppingCartChanged = new Subject<ShoppingCart>();
  }

  getShoppingCartId() {
    let shoppingCartId: string = localStorage.getItem('shoppingCartId');
    if (shoppingCartId == null) {
      shoppingCartId = "shoppingCartId-" + Math.floor(Math.random() * 1000001);
      localStorage.setItem('shoppingCartId', shoppingCartId);
    }
    return shoppingCartId;
  }

  clearShoppingCartId() {
    localStorage.removeItem('shoppingCartId');
  }

  addToCart(product: number, quantity: number) {
    let cartId = this.getShoppingCartId();
    let productsUrl = environment.apiUrl + "angular/cart/add/" + cartId + "/" + product + "/" + quantity;
    this.http.get<ApiResponse>(productsUrl).subscribe(res => {
      this.loadCart();
      this.shoppingCartChanged.next(this.shoppingCart);
    });
  }

  removeFromCart(product, quantity) {
    let cartId = this.getShoppingCartId();
    let productsUrl = environment.apiUrl + "angular/cart/remove/" + cartId + "/" + product + "/" + quantity;
    this.http.get<ApiResponse>(productsUrl).subscribe(res => {
      this.loadCart();
      this.shoppingCartChanged.next(this.shoppingCart);
    });
  }

  async loadCart() {
    let cartId = this.getShoppingCartId();
    let productsUrl = environment.apiUrl + "angular/cart/get/" + cartId;
    const sc = await this.http.get<ShoppingCart>(productsUrl).toPromise();
    this.shoppingCart = sc;
    this.shoppingCartChanged.next(this.shoppingCart);
  }

  public getCart() : ShoppingCart {
    if (this.shoppingCart == null)
      this.loadCart();
    return this.shoppingCart;
  }

  public getTotalItems() : number { 
    if (! this.shoppingCart || ! this.shoppingCart.contents || this.shoppingCart.contents.length == 0)
     return 0;
    let sum = this.shoppingCart.contents.map(item => item.quantity).reduce( (accumulator, currentValue) => accumulator + currentValue);
    return sum;
  }

  clear() {
    this.shoppingCart = null;
    this.clearShoppingCartId();
    this.loadCart();
  }

  getProductCount(productId: number) {
    if (! this.shoppingCart || ! this.shoppingCart.contents)
      return 0;
    console.log("quantity 1 = " + this.shoppingCart.contents);
    this.shoppingCart.contents.forEach(item => console.log("qqq = " + item + " " + item.quantity + " " + item.productId));
    let item = this.shoppingCart.contents.find(item => {item.productId == productId}); // this didn't work.  had to use forloop below
    for (let i2 of this.shoppingCart.contents) {
      if (i2.productId == productId) {
        item = i2;
        break;
      }
    }
    if (item == null)
      var quantity = 0;
    else
      quantity = item.quantity;
    console.log("quantity 2 = " + quantity);
    return quantity;
  }

  totalCost() : number {
    // let products: Product[] = await this.productsService.getProductsNow();

    let products = [{productId: 0, price: 6}, {productId: 1, price: 6}, {productId: 2, price: 3}, {productId: 3, price: 3}, {productId: 4, price: 3}, {productId: 5, price: 3}, {productId: 6, price: 3}];
    let total: number = 0;
    this.shoppingCart.contents.forEach(i => {total += i.quantity * products[i.productId-1].price});
    return total;
  }


}
