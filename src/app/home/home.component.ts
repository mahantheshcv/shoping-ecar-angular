import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  popularProduct:undefined | any;
  trendyProduct:undefined | any;
  constructor(private product :ProductService){

  }
  ngOnInit(): void {
    this.product.popularPruduct().subscribe((data)=>{
      // console.log(data);
      this.popularProduct = data;
    });
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProduct = data;
    });
  }

 
}

