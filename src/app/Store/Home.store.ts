import { Injectable, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product, ProductResponse } from '../models/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeStore {


  $products = new BehaviorSubject<Product[]>([]);

  products: Product[] = [];
  page = 1;
  pageSize = 10;
  constructor(private productService: ProductService) {

  }
  init(): void {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.$products.next(this.products)
    }else {
      this.loadProducts();
    }
  }

  loadProducts() {
    this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
      if (data.products.length > 0 ) {

        this.products.push(...data.products);
        this.$products.next(this.products)
        localStorage.setItem('products', JSON.stringify(this.products));
      }
    });
  }
  loadData(event:any) {
    this.page++
   this.productService.getAllItems(this.page ,this.pageSize).subscribe((data: ProductResponse) => {
      if (data.products.length > 0) {
        this.products.push(...data.products)
        this.$products.next(this.products)
        localStorage.setItem('products', JSON.stringify(this.products));
      } else {
        event.target.disabled = true; 
      }
      event.target.complete();
})
  }


  searchProducts(query: string) {
    query = query.toLowerCase();
    const filteredProducts = this.products.filter(product => {
      return product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    });

    // this.$products.next(filteredProducts);
  }
}





