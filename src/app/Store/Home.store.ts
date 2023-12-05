



import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../Services/product.service';
import { Product, ProductResponse } from '../models/products';
import { action } from 'mobx';


@Injectable({
  providedIn: 'root'
})
export class HomeStore {
  $products = new BehaviorSubject<Product[]>([]);
  products: Product[] = [];
  page = 1;
  pageSize = 10;
  ProductsLoaded = false;
  constructor(private productService: ProductService) {
  }
  async init(): Promise<void> {
    const currentPage = localStorage.getItem('page');
    const currentPageSize = localStorage.getItem('pageSize');
    const storedProducts = localStorage.getItem('products');
  
    if (currentPage && currentPageSize) {
      this.page = JSON.parse(currentPage);
      this.pageSize = JSON.parse(currentPageSize);
    }
  
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.$products.next(this.products);
      this.ProductsLoaded = true;
    } else {
      this.loadProducts();
    }
  }

  @action async loadProducts(): Promise<void> {
    if (this.ProductsLoaded && this.products.length >= 100) {
      return;
    } else {
      this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
    
          const newProducts = data.products.filter(product => !this.products.some(p => p.id === product.id));
          if(newProducts.length >0){

            this.products.push(...newProducts);
            this.$products.next(this.products);

            localStorage.setItem("page", JSON.stringify(this.page));
            localStorage.setItem("pageSize", JSON.stringify(this.pageSize));

            localStorage.setItem('products', JSON.stringify(this.products));
          }
         else {
          this.ProductsLoaded = true;
        }
      });
    }
  }
  @action async loadData(event: any): Promise<void> {
    if (this.ProductsLoaded && this.products.length === 100) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    this.page++;
    this.productService.getAllItems(this.page, this.pageSize).subscribe((data: ProductResponse) => {
      if (data.products.length > 0) {
        const newProducts = data.products.filter(product => !this.products.some(p => p.id === product.id));
        this.products.push(...newProducts);
        this.$products.next(this.products);

        localStorage.setItem("page", JSON.stringify(this.page));
        localStorage.setItem("pageSize", JSON.stringify(this.pageSize));
  
        localStorage.setItem('products', JSON.stringify(this.products));
      } else {
        this.ProductsLoaded = true;
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }
  

 @action async searchProducts(query: string) :Promise<void> {
    this.productService.searchProducts(query).subscribe((data: any) => {
      if (Array.isArray(data.products)) {
        this.products = data.products;
      }
      this.$products.next(this.products);
    });
    
  }

  @action
  async addProduct(newProduct: Product): Promise<void> {
    const maxId = Math.max(...this.products.map(product => product.id), 0);
    newProduct.id = maxId + 1;
   await this.productService.AddProduct(newProduct);
     this.products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(this.products));
  }


  async updateProduct(updatedProduct: Product): Promise<void> {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct }; 
      this.$products.next([...this.products]); // Update product in the BehaviorSubject

      localStorage.setItem('products', JSON.stringify(this.products));

      await this.productService.updateProduct(updatedProduct).subscribe(()=>{
        console.log(`Product with ID ${updatedProduct} Update successfully.`)
      }) 
    }
  }
  
  async deleteProduct(productId: number): Promise<void> {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.$products.next(this.products);

      localStorage.setItem('products', JSON.stringify(this.products));

      this.productService.deleteProduct(productId).subscribe(() => {
        console.log(`Product with ID ${productId} deleted successfully.`);
      });
    }
  }
}

