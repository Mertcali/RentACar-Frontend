import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  apiUrl="https://localhost:44378/api/auth/"
  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login", user)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  register(user:User){
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl+"register", user)
  }

  logout(){
    localStorage.clear();
  }


}
