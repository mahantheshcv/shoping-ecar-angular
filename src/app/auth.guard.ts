import {  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private sellerService: SellerService  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(localStorage.getItem('seller')){
        return true;
      // this.isSellerLoggedIn.next(true);
      // this.router.navigate(['seller-home']); // redirecting to seller-home 
    } // this code wrinting in seller.service.ts becoud
    return this.sellerService.isSellerLoggedIn;
  }
}
