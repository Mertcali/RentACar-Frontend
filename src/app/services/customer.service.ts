import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerDetail } from '../models/customerDetail';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44378/api/"
  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetail>>{
    let newPath= this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerWithMail(email:string):Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "customers/getbymail?email=" +email
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerByUserId(id:number):Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "customers/getbyuserid?id=" +id
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl +"users/update",user)
  }

  addFindexById(userId:number){

  }


}
