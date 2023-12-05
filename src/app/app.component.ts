import { Component } from '@angular/core';
import { ProductService } from './Services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  title = 'Ionic_Project';
 

  constructor(private api :ProductService){
    this.api.getAllItems()
  }
}