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

}
