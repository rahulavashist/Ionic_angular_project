import { Product, ProductResponse } from '../../models/products';
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
  searchQuery = ''
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
searchProduct(event:any) {
  const search = event?.target.value
  if (search.trim() !== '') {
    this.homeStore.searchProducts(search);
   
  } else {
    this.homeStore.init();
  }
}
updateProduct(event:any){
  this.homeStore.updateProduct(event)
}

deleteProduct(productId: number): void {
  this.homeStore.deleteProduct(productId);
}
}

