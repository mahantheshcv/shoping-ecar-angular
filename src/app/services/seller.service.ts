import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'



@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginerror = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }  // we create instance 'private http:HttpClient' to use this 

  userSignUp(data: any) { // it acept any type of data
    // console.log('sr');
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }
    ).subscribe((result) => {
      console.log('sriki');
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));// here we storing signup data localstorage 
      this.router.navigate(['seller-home']);
      // console.warn("result", result);
    });
    // return false;
  } //here we are storing signup data to API seller we creted

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      //   this.router.navigate(['seller-home']); // redirecting to seller-home 

    }
  }
  userLogin(data: any) {
    console.warn(data);
    // console.warn("hi hello");
    // api call will be there 
    this.http.get(`http://localhost:3000/seller?password=${data.password}&Email=${data.Email}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      // console.warn("hello");
      console.log(result);
      // console.warn("hi")
      if (result && result.body && result.body.length) {
         console.warn("user logged in ");
        localStorage.setItem('seller',JSON.stringify(result.body));// here we storing signup data localstorage 
        this.router.navigate(['seller-home']);
        // console.warn("bye");
        console.log("result", result);
        // console.warn("bye1");

      } else {
        console.warn("login failed");
        this.isLoginerror.emit(true)
      }
    })
  }
}
