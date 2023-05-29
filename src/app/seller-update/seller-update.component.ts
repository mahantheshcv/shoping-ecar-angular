import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update',
  templateUrl: './seller-update.component.html',
  styleUrls: ['./seller-update.component.css']
})
export class SellerUpdateComponent implements OnInit {

    productData:undefined | any;
  productMessage:undefined | string;
  constructor( private route: ActivatedRoute, private product : ProductService){

  }
  ngOnInit(): void {
        let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log("hi");
      console.log(data);
      this.productData = data 

    })
    
  }
  submit(data:any){

  
    console.log(data);  
    if(this.productData){
      data.id= this.productData.id; 
    }
    this.product.updateProduct(data).subscribe((result)=>{
       if(result){
       this.productMessage="Product is Updated"
       }
    })

    setTimeout(() => {
      this.productMessage=undefined
      
    }, 3000);

  }
}
