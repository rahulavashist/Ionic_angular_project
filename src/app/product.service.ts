import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {
  }
  getAllItems(page: number = 1, pageSize: number = 10): Observable<any> {
    const skip = (page - 1)  * pageSize ;
    const url = `${this.apiUrl}?limit=${pageSize}&skip=${skip}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(data => data), 
        catchError(this.handleError) 
      );
  }
  getSingleProductById(productById: any): Observable<any>{  
    const url = `${this.apiUrl}/${productById}`;
      return this.http.get<any>(url)
      .pipe(
        map(data => data),
        catchError(this.handleError)
        );
      }
 
  private handleError(error: any) {
    console.error('API error', error);
    return throwError('Please try again later.');
  }
}


// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'https://dummyjson.com/products';

//   constructor(private http: HttpClient) {
//   }

//   getAllItems(page: number = 1, pageSize: number = 10, search: string = ''): Observable<any> {
//     const skip = (page - 1) * pageSize;
    
//     let params = new HttpParams()
//       .set('limit', pageSize.toString())
//       .set('skip', skip.toString());

//     if (search) {
//       params = params.set('search', search);
//     }

//     const url = `${this.apiUrl}`;
//     return this.http.get<any[]>(url, { params })
//       .pipe(
//         map(data => data),
//         catchError(this.handleError)
//       );
//   }

//   getSingleProductById(productId: any): Observable<any> {
//     const url = `${this.apiUrl}/${productId}`;
//     return this.http.get<any>(url)
//       .pipe(
//         map(data => data),
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: any) {
//     console.error('API error', error);
//     return throwError('Please try again later.');
//   }
// }
