import { environment } from './../../../environments/environment.prod';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Person } from './Person';
import { Product } from 'src/app/models/product';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'manageproducts',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings;

  persons: Person[];

  products: Product[];
  
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private productService: ProductsService) { }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      lengthMenu: [1, 2, 3],
      processing: true,
      stateSave: true,
      retrieve: true,
      order: [0, 'desc']
    };

    this.persons = [
      {id:1, firstName:"a", lastName: "aa"},
      {id:2, firstName:"b", lastName: "bb"},
      {id:3, firstName:"c", lastName: "cc"},
    ];

    // let productsUrl = environment.apiUrl + "angular/products"
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
        this.dtTrigger.next();
      },
      error => {console.error(error)}
    );


  }

}
