import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  faCoffee = faCoffee;

  categories: string [];

  products : Product [];

  filteredProducts : Product [];

  currentCategory : string;

  cardIsActive: true;

  constructor(private productsService: ProductsService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categories.splice(0, 0, 'All Categories');
      console.log(categories);
    });

    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      console.log(products);
      this.setFilteredProducts();
    });

    this.activatedRoute.queryParamMap.subscribe(x => {
      this.currentCategory = x.get("category");
      if (this.products == null) {
        this.products = [];
      }
      this.setFilteredProducts();
    });

  }

  private setFilteredProducts() {
    if (!this.currentCategory || this.currentCategory === 'All Categories') {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = [];
      for (let product of this.products) {
        if (product.category === this.currentCategory)
          this.filteredProducts.push(product);
      }
    }
  }
}
