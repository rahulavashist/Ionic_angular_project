import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'https://dummyjson.com/products';

  private products: Product[] = [];

  constructor(private http: HttpClient) {
  }
  getAllItems(page: number = 1, pageSize: number = 10): Observable<any> {
    const skip = (page - 1) * pageSize;
    const url = `${this.apiUrl}?limit=${pageSize}&skip=${skip}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }
  getSingleProductById(productById: any): Observable<any> {
    const url = `${this.apiUrl}/${productById}`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data),

        catchError(this.handleError)
      );
  }
  searchProducts(query: string): Observable<Product[]> {
    const url = `${this.apiUrl}/search?q=${query}`;
    return this.http.get<Product[]>(url).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  AddProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/add`;

    const existingProduct = this.products.find(p => p.id === product.id);

    if (existingProduct) {
      return throwError('Product already exists.');
    }
    return this.http.post<Product>(url, product).pipe(
      map((newProduct: Product) => {
        return newProduct;
      }),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`; 

    return this.http.put<Product>(url, product).pipe(
      map((updatedProduct: Product) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct; 
        }
        return updatedProduct; 
      }),
      catchError(this.handleError)
    );
  }


  deleteProduct(productId: number): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API error', error);
    return throwError('Please try again later.');
  }
}
