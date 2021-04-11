import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCardService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44378/api/fakecards/"

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"iscardexist";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }

  getCardByUserId(userId:number):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl+"getbyuserid?id="+userId;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath)
  }

  add(fakeCard:FakeCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",fakeCard)
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl+"getbycardnumber?id="+cardNumber
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath)
  }

}
