import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartItemComponent } from 'src/app/shopping-cart-item/shopping-cart-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];

  shoppingCart: ShoppingCart;

  cart: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService, private router: Router) {
  }

  async ngOnInit() {
    this.products = await this.productsService.getProductsNow();
    this.shoppingCart = await this.shoppingCartService.getCart();
    // await this.loadShoppingCartData();
    this.cart = this.shoppingCartService.shoppingCartChanged;
    this.cart.subscribe(a => { 
      console.log(" ShoppingCartComponent in subscribe  " + a); 
      this.shoppingCart = a; 
      
    });
  }

  async xxxloadShoppingCartData() {
    this.products = await this.productsService.getProductsNow();
    // let lproducts = await this.productsService.getProductsNow();
    console.log(this.products);
    // console.log(lproducts);

    // console.log(this.shoppingCartService.shoppingCart);
    // let shpcart = this.shoppingCartService.shoppingCart;
    // shpcart.subscribe(res => {
    //   console.log(res); 
    //   this.shoppingCart = res;
    //   console.log("this.shoppingCart " + this.shoppingCart);
    // });

    // this.productsService.getProducts().subscribe(res => {
    //   console.log("this.shoppingCart 2 " + this.shoppingCart);
    // });
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

  getTotalCost() : number {
    let totalCost = this.shoppingCartService.totalCost();
    return totalCost;
  }

  filteredItems() : { productId: number; quantity: number; } [] {
    if (! this.shoppingCart || ! this.shoppingCart.contents)
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
