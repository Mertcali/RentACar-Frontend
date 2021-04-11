import { Injectable } from '@angular/core';
import { CustomerDetail } from '../models/customerDetail';
import { Rental } from '../models/rental';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {



  constructor() 
  {}
   getItem(key:string){
    return localStorage.getItem(key);
  }

  setItem(key:string, value:any){
    localStorage.setItem(key,value);
  }

  removeItem(key:string){
    localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }

  setToken(token: string){
    localStorage.setItem("token",token)
  }

  removeToken(){
    localStorage.removeItem("token");
  }
 
  getToken(){
    return localStorage.getItem("token");
  }

}



