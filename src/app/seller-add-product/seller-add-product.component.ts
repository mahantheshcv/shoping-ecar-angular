import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
 
  addProductMessage:string|undefined;
  constructor(private product:ProductService){

  }
  ngOnInit(): void {
  
  }
  submit(data:any){ 
    // console.log(data);
    this.product.addProduct(data). // here we sending the data typed by the product details 
      subscribe((result)=>{
        console.log(result)
        if(result){
          this.addProductMessage= "Product are Added"
        }
        setTimeout(() => (this.addProductMessage=undefined),3000 );
      });
  }
}
