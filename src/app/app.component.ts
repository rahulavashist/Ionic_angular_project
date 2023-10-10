import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  title = 'Ionic_Project';
 

  constructor(private api :ProductService){
    this.getData()
  }
  getData(){

    this.api.getAllItems()
    
}

}