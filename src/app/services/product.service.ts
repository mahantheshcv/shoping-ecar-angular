import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {  order, product } from '../data-type';
import {cart} from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }

  addProduct(data: any) { //here we reciving the  data typed by the product details 

    return this.http.post('http://localhost:3000/products', data)
  }
  productList() {
    return this.http.get<any[]>('http://localhost:3000/products'); // here we calling API service, 
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<any>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(any:any){
    console.log(any);
   return this.http.put<any>(`http://localhost:3000/products/${any.id}`,any); 
  }
  popularPruduct(){
    return this.http.get<any[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProduct(){
    return this.http.get<any[]>('http://localhost:3000/products?_limit=8');
  }
  searchProduct(query:string){
    return this.http.get<any[]>(`http://localhost:3000/products?q=${query}`);
 
  }
  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
      console.log("else");   
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
 
  }
   removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items = items.filter((item:product)=>productId!==item.id);
      //  console.log(items);
      localStorage.setItem('localCart',JSON.stringify(items));
         this.cartData.emit(items);
      }}
  

   addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
   }



   getCartList(userId:number){
    // console.log(userId);
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      
      console.log(result );
      if(result &&result.body){
        this.cartData.emit(result.body)
      } 
    }) 
   }

 removeToCart(cartId:number){
  return this.http.delete('http://localhost:3000/cart/'+cartId);
 }
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }
  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
  }
