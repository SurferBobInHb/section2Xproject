import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartItemComponent } from 'src/app/shopping-cart-item/shopping-cart-item.component';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  products: Product[] = [];

  shoppingCart: ShoppingCart;

  cartObserver: Observable<ShoppingCart>;

  subscriptions: Subscription [];

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.subscriptions = new Array(2);
    let subscription = this.productsService.getProducts().subscribe(
      res => {this.products = res},
      error => {console.log(error)}
    );
    this.subscriptions.push(subscription)
    
    this.shoppingCart = this.shoppingCartService.getCart();

    this.cartObserver = this.shoppingCartService.shoppingCartChanged;

    subscription = this.cartObserver.subscribe(shoppingCart => { 
      this.shoppingCart = shoppingCart; 
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  getProduct(productId: number) {
    let product: Product = this.products.find(p => p.id == productId);
    return product; 
  }

  get shoppingCartCount() {
    let totalItems = this.shoppingCartService.getTotalItems();
    return totalItems;
  }

  clearShoppingCart() {
    return this.shoppingCartService.clear();
  }

  getTotalCost(): number {
    if (!this.products || this.products.length == 0 || !this.shoppingCart)
      return 0;
    let total: number = 0;
    this.shoppingCart.contents.forEach(i => { total += i.quantity * this.products[i.productId - 1].price });
    return total;
  }

  filteredItems() : { productId: number; quantity: number; } [] {
    if (! this.shoppingCart || ! this.shoppingCart.contents || ! this.products || this.products.length == 0)
      return [];
    let filteredItems : { productId: number; quantity: number; } [] = [];
    let items: { productId: number; quantity: number; } [] = this.shoppingCart.contents;
    for (let item of items) {
      if (item.quantity > 0) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

  checkOut() {
    this.router.navigate(['/check-out']);
  }

  onSubmit() {
    
  }

}
