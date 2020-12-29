import { ShoppingCartService } from './../../services/shopping-cart.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiResponse } from '../new-product/new-product.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  cardIsActive: boolean;

  constructor(private shoppingCartService: ShoppingCartService) { 
    this.cardIsActive = false;
  }

  ngOnInit(): void {
    console.log("product.id = " + this.product.id);
  }

  addToCart() {
    this.cardIsActive = true;
    console.log("addtocard", this);
    this.shoppingCartService.addToCart(this.product.id, 1); //.subscribe(res => {}, error => {console.log((error as ApiResponse).message)});
  }

  removeFromCart() {
    this.cardIsActive = true;
    console.log("removeFromCart", this);
    this.shoppingCartService.removeFromCart(this.product.id, 1);//.subscribe(res => {}, error => {console.log((error as ApiResponse).message)});
  }

  productCount(productIn: Product) {
    return this.shoppingCartService.getProductCount(productIn.id);
  }

  get count() {
    return 777;
  }
}
