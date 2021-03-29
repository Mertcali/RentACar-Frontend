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


  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "getbycardnumber";
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }


  updateCard(fakeCard:FakeCard): Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }

  addCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl +"add";
    return this.httpClient.post<ResponseModel>(newPath, fakeCard)
  }

}
