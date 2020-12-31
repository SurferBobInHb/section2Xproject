import { Product } from './../../models/product';
import { ProductsService } from './../../services/products.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  private shoppingCart: ShoppingCart;

  public products: Product[];

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getCart()
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  get items() {
    return this.shoppingCart.contents.filter(i => i.quantity > 0);
  }

  getProduct(item): Product {
    if (!this.products)
      return null;
    return this.products[item.productId - 1];
  }

  getTotalCost(): number {
    if (!this.products || !this.shoppingCart)
      return 0;
    let total: number = 0;
    this.shoppingCart.contents.forEach(i => { total += i.quantity * this.products[i.productId - 1].price });
    return total;
  }

  getShoppingCartCount() {
    if (!this.shoppingCart)
      return 0;
    let total: number = 0;
    this.shoppingCart.contents.forEach(i => { total += i.quantity });
    return total;
  }
}
