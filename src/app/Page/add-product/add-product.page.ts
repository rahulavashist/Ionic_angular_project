import { Component, OnInit } from '@angular/core';

import { HomeStore } from 'src/app/Store/Home.store';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
 

  product: Product = {
    id: 0,  
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []  
  };
 
 
  constructor(private homeStore: HomeStore) {}
  ngOnInit(): void {
 
  }
  onThumbnailChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const thumbnailFile = inputElement.files[0];
      this.readAndSetImage(thumbnailFile, (result: string) => {
        this.product.thumbnail = result;
      });
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const imageFile = inputElement.files[0];
      this.readAndSetImage(imageFile, (result: any) => {
        this.product.images.push(result);
      });
    }
  }
  readAndSetImage(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  addProduct(): void {
    this.homeStore.addProduct(this.product);
  
    console.log("--->>>",this.product)

    this.product = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: []
    };
  }

}