
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product, ProductResponse } from '../models/products';


// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   products: Product[] = [];
//   page = 1;
//   pageSize = 10;
 
//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {

//     const storedProducts = localStorage.getItem('products');
//     if (storedProducts) {
//       this.products = JSON.parse(storedProducts);
//     } else {
//       this.loadProducts();
//     }
//   }

//   loadProducts() {
//     this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
//       if (data.products.length > 0) {
//         this.products.push(...data.products);
//         localStorage.setItem('products', JSON.stringify(this.products));
//       }
//     });
//   }
  
//   loadData(event: any) {
//     this.page++;
//     this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
//       if (data.products.length > 0) {
//         this.products.push(...data.products);
//         localStorage.setItem('products', JSON.stringify(this.products));
//       } else {
//         event.target.disabled = true; 
//       }
//       event.target.complete();
     
//     });
//   }
// }




// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   products: Product[] = [];
//   page = 1;
//   pageSize = 10;

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     const storedProducts = localStorage.getItem('products');
//     if (storedProducts) {
//       this.products = JSON.parse(storedProducts);
//     } 
//   }

//   loadProducts() {
//     this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
//       if (data.products.length > 0 ) {
//         this.products = data.products;
//         localStorage.setItem('products', JSON.stringify(this.products)); 
//       }
      
//     });
//   }

//   loadData(event: any) {
//     this.page++;
//     this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
//       if (data.products.length > 0) {
//         this.products.push(...data.products);
//       } else {
//         event.target.disabled = true;
//       }
//       event.target.complete();
//     });
//   }
// }


import { Product, ProductResponse } from '../../models/products';
import { ProductService } from '../../product.service';
import { HomeStore } from '../../Store/Home.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  page = 1;
  pageSize= 10
  constructor(private homeStore : HomeStore) {

    this.homeStore.$products.subscribe((produts) => {
      this.products = produts;
    })

  }

  ngOnInit(): void {
    this.homeStore.init();
  }

  loadProductsData() {
   this.homeStore.loadProducts();
  }
  loadData(event:any) {
    this.homeStore.loadData(event)
   

}
searchProduct(event: any) {
  const query = event.target.value;
  this.homeStore.searchProducts(query);
}
// async searchProduct(event: any) {
//   const searchTerm: string = event.target.value;
//   console.log('--->>',searchTerm)
//   this.homeStore.searchProduct(searchTerm);
// }
}

