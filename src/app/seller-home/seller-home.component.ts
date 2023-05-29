import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

 productList:undefined |any[];
 productMessage:undefined |string;
 icon=faTrash; // fontawsome icon using 
 editIcon=faEdit;
  constructor( private product:ProductService){

  }
  ngOnInit(): void {
    this.list();

    // this.product.productList().subscribe((result)=>{        //productlist is calling API service
    //   console.log(result)
    //   if(result){
    //     this.productList=result;   //  //productlist is calling API service
    //   } 
      
    // })
  }
  deleteProduct(id:number){
    console.log("test id",id)
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = "Product id deleted";
        this.list()

      }

      
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000); 
   
  }

    list(){
    this.product.productList().subscribe((result)=>{        //productlist is calling API service
      console.log(result)
      if(result){
        this.productList=result;   //  //productlist is calling API service
      } 
      
    })
  }
}
