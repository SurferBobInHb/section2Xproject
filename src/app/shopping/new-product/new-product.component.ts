import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { imageNameValidator } from 'src/app/validators/image-name-validator';

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

  productId: number;

  apiReponse: ApiResponse;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService, private route: ActivatedRoute,
    private router: Router) { 
    this.categories = ['meat', 'bread', 'lunch'];
    console.log(this.categories);
    
    this.productForm = this.formBuilder.group({
      'title': [this.product?.title, [Validators.required]],
      'price': [this.product?.price, [Validators.required, Validators.min(.01), Validators.pattern("^\\$?(\\d*(\\d\\.?|\\.\\d{1,2}))$")]],
      'category': [this.product?.category, [Validators.required]],
      'imageUrl': [this.product?.imageUrl, [Validators.required, imageNameValidator(['jpg','gif'])]]
    });
  }

  get title() {return this.productForm.get('title');}
  get price() {return this.productForm.get('price');}
  get category() {return this.productForm.get('category');}  
  get imageUrl() {return this.productForm.get('imageUrl');}

  ngOnInit(): void {
    this.loadProducts();

    this.route.paramMap.subscribe(params => {this.productId = +params.get('id'); this.loadProductFromId();});
  }

  loadProductFromId() {
    this.productService.getProduct(this.productId).subscribe(response => {
      this.product = response;
      console.log(this.product);
      this.productForm.get('title').setValue(this.product.title);
      this.productForm.get('price').setValue(this.product.price);
      this.productForm.get('category').setValue(this.product.category, {onlySelf: true});
      this.productForm.patchValue({category : this.product.category})
      this.productForm.get('imageUrl').setValue(this.product.imageUrl);
    });
  }

  onFormSubmit(productFormData) : void {
    console.log('title:' + this.productForm.get('title').value);
    console.log('price:' + this.productForm.get('price').value);
    this.saveProduct(productFormData);
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

  deleteProduct() {
    console.log("deleteProduct");
    this.productService.deleteProduct(this.productId).subscribe(
      response => {
        console.log("deleteProduct call successful value returned in body ", response);
      },
      errorResponse => {
        this.apiReponse = errorResponse.error;
        console.log("deleteProduct call in error ", errorResponse);
      },
      () => {
        console.log("The deleteProduct observable is now completed.");
        this.router.navigate(['/manage-products']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/manage-products']);
  }

  saveProduct(newOrEditedProduct) {
    console.log("saveProduct" + newOrEditedProduct);

    if (this.productId) {
      this.productService.editProduct(this.productId, newOrEditedProduct).subscribe(
        result => {
          console.log("editProduct call successful value returned in body ", result);
        },
        response => {
          console.log("editProduct call in error ", response);
        },
        () => {
          console.log("The editProduct observable is now completed.");
          this.router.navigate(['/manage-products']);
        }
      );
    }
    else
      this.productService.createProduct(newOrEditedProduct).subscribe(
        result => {
          console.log("createProduct call successful value returned in body ", result);
        },
        response => {
            console.log("createProduct call in error ", response);
        },
        () => {
            console.log("The createProduct observable is now completed.");
            this.router.navigate(['/manage-products']);
        }
      );
  }

  onChange(s) {
    console.log(s);
  }

  onImageChange() {
    this.product.imageUrl = this.productForm.get('imageUrl').value;
  }
}

export class ApiResponse {
  success: boolean;
  message: string;
}