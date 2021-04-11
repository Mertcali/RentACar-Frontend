import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findex } from '../models/findex';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl="https://localhost:44378/api/findex/"

  constructor(private httpClient:HttpClient) { }

  getFindexScoreByUserId(userId:number):Observable<ListResponseModel<Findex>>{
    let newPath=this.apiUrl+"getbyuserid?id=" + userId
    return this.httpClient.get<ListResponseModel<Findex>>(newPath);

  }

  add(findex:Findex){
    return this.httpClient.post<SingleResponseModel<Findex>>(this.apiUrl+"add",findex)
  }


}
