import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName :string = '';
  cartItems = 0;

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {  // ngOnInit used to perform initialization tasks, such as retrieving data from a server, setting up subscriptions, or initializing component properties.

    this.route.events.subscribe((val: any) => {
      // console.warn(val.url);
      if (val.url) {
        // console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            // console.log(sellerData);
            this.sellerName = sellerData.name;
            this.menuType ='seller';

          }
        } else if(localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.product.getCartList(userData.id)
      
        } else {
          // console.warn("outside seller") 
          this.menuType = "default"
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/home']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) { //get event data in the form get 
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        // console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }

  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {

    this.route.navigate(['/details/' + id])
  }
  submitSearch(val: string) {
    // console.log(val)
    this.route.navigate([`search/${val}`])

  }
}
