import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) { } // here we crating instance for what we import

  // what ever the function we writing in the html have call here
  showLogin = false;
  authError: string = '';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: any): void {
    console.warn(data);
    //  this.seller.userSignUp(data).subscribe((result)=>{   // here we retun the data and subscribe the result
    //     //  console.warn(result);
    //   if(result){
    //     this.router.navigate(['seller-home'])
    //   }
    //  });  
    this.seller.userSignUp(data);

  }

  Login(data: any): void {
    // console.warn(data);  
    //  this.seller.userSignUp(data).subscribe((result)=>{   // here we retun the data and subscribe the result
    //     //  console.warn(result);
    //   if(result){
    //     this.router.navigate(['seller-home'])
    //   }
    //  });  
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginerror.subscribe((isError) => {

      if (isError) {
        this.authError = " user email or password is not correct"

      }
    }
    )
  }


  openLogin() {

    this.showLogin = true;
  }
  openSignUp() {

    this.showLogin = false;
  }
}
