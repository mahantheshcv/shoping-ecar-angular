import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private user: UserService, private product: ProductService) {  // we creating the user service instance 

  }
  ngOnInit(): void {
    this.user.userAuthReload();

  }
  signUp(data: SignUp) {
    // console.log(data);
    this.user.userSignUp(data);  //  here we using the service
  }


  login(data: Login) {
    //  console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.authError = "User not found"
      } else {
        //   console.log("ok");
        this.localCartToRemoteCart()

      }
    })

  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    //  console.warn(data);
    let user = localStorage.getItem('user');
    //  if (user !== null) {
    //     user = JSON.parse(user);
    //     console.warn(user);
    //  } else {
    //     console.log("No user data found in localStorage");
    //  }  

    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);


      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("item stored in db");

            }
          })


        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      });
    }


    setTimeout(() => {
      this.product.getCartList(userId);

    }, 2000);


  }


}
