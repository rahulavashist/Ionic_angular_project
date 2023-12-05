import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Injectable({
  providedIn: 'root'
})
export class MoreDetailsStore {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    makeAutoObservable(this);
  }

  loadProductDetails() {
    const productById: any = this.route.snapshot.paramMap.get('id');
    const storedProduct = localStorage.getItem(`product_${productById}`);

    if (storedProduct) {
      this.product = JSON.parse(storedProduct);
    } else {
      this.productService.getSingleProductById(productById).subscribe(
        (product: any) => {
          this.product = product;
          localStorage.setItem(`product_${productById}`, JSON.stringify(product));
        },
        error => {
          console.error('Error fetching product details :', error);
        }
      );
    }
  }
}