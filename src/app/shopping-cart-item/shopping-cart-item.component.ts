import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductsService } from './../services/products.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product';
import { ApiResponse } from '../shopping/new-product/new-product.component';

@Component({
  selector: 'shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input("quantity") quantity: number;

  @Input("product") product: Product;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    console.log(this.product);
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product.id, 1);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product.id, 1);
  }
}
