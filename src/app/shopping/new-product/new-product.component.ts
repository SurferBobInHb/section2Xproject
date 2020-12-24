import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  categories: string [];

  products: Product [];

  productForm : FormGroup;

  product : Product;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { 
    this.categories = ['meat', 'bread', 'lunch'];
    console.log(this.categories);

    this.productForm = this.formBuilder.group({
      'title': [''],
      'price': [''],
      'category': [''],
      'imageUrl': ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onFormSubmit() : void {
    console.log('title:' + this.productForm.get('title').value);
    console.log('price:' + this.productForm.get('price').value);
  }

  getCategories() {
    return this.categories;
  }

  loadProducts() {
    return this.productService.getProducts().subscribe(
      response => {
        this.products = response;
        console.log(this.products);
        this.product = this.products[0];
      },
      error => {console.error(error)}
    );
  }

  getProducts() : Product [] {
    return this.products;
  }
}
