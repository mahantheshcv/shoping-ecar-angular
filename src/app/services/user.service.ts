import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    // console.log(user);
    this.http.post("http://localhost:3000/users", user, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body)); // used to create the localstorege
          this.router.navigate(['/home']);  // if the user login it will redirect to home page 

        }
      })
  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result)=>{
      if(result && result.body?.length){
        // console.log(result);
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/home']);
      } 
      else {

        this.invalidUserAuth.emit(true);
      }
    })

  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/home'])
    }
  }
}
