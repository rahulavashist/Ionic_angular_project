
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-more-details',
//   templateUrl: './more-details.page.html',
//   styleUrls: ['./more-details.page.scss'],
// })
// export class MoreDetailsPage implements OnInit {
//   product: any;

//   constructor(private route: ActivatedRoute, private productService: ProductService) {}

//   ngOnInit() :void {
   
//     const productId = this.route.snapshot.paramMap.get('id');

//     this.productService.getProductById(productId)
//       .subscribe((product: any) => {
//         this.product = product;
  
//       });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-more-details',
//   templateUrl: './more-details.page.html',
//   styleUrls: ['./more-details.page.scss'],
// })
// export class MoreDetailsPage implements OnInit {
//   product: any;

//   constructor(private route: ActivatedRoute, private productService: ProductService) {}

//   ngOnInit(): void {
//     const productId :any = this.route.snapshot.paramMap.get('id');
//     const storedProduct = localStorage.getItem(productId);

//     if (storedProduct) {
//       this.product = JSON.parse(storedProduct);
//     } 
//     else {
//       this.productService.getProductById(productId).subscribe((product: any) => {
//         // this.product = product;
//         localStorage.setItem(productId, JSON.stringify(product));
//       });
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-more-details',
//   templateUrl: './more-details.page.html',
//   styleUrls: ['./more-details.page.scss'],
// })
// export class MoreDetailsPage implements OnInit {
//   product: any;

//   constructor(private route: ActivatedRoute, private productService: ProductService) {}

//   ngOnInit(): void {
//     const productId : any= this.route.snapshot.paramMap.get('id');
//     const storedProduct = localStorage.getItem(productId);

//     if (storedProduct) {
//       this.product = JSON.parse(storedProduct);
//     } else {
  
//       this.productService.getProductById(productId).subscribe(
//         (product: any) => {
//           this.product = product;
     
//           localStorage.setItem(productId , JSON.stringify(productId));
//         }
        
//     )}
    
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';

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




// import { ProductResponse } from './../../models/products';


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from 'src/app/product.service';

// @Component({
//   selector: 'app-more-details',
//   templateUrl: './more-details.page.html',
//   styleUrls: ['./more-details.page.scss'],
// })
// export class MoreDetailsPage implements OnInit {
//   product: any;


//   constructor(private route: ActivatedRoute,private productService : ProductService) {}

//   ngOnInit(): void {
//     const productById: any = this.route.snapshot.paramMap.get('id');
//     const storedProduct = localStorage.getItem(`product_${productById}`);

//   if(storedProduct) {
//       this.product = JSON.parse(storedProduct);
//       console.log("---->>>>",storedProduct)
      
//     }
//   else {
//     this.productService.getSingleProductById((data : ProductResponse) =>{
//       if(this.product.length > 0){
//         this.product = data.products
//       }
//     } )
//           localStorage.setItem(`product_${productById}`, JSON.stringify(this.product));
//        }
//   }
// }
