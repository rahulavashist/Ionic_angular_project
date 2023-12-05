

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.page.html',
  styleUrls: ['./more-details.page.scss'],
})
export class MoreDetailsPage implements OnInit {
  product: any;


  constructor(private route: ActivatedRoute, private productService: ProductService) {}
  ngOnInit(): void {
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


