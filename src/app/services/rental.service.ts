import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentingCar:Rental
  apiUrl="https://localhost:44378/api/rentals/"

  constructor(private httpClient:HttpClient) { }


  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath)
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentalbycarid?id="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  getRentalDetailsByCarId(carId:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "getrentaldetailsbycarid?id="+carId
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath)
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
 }

 getRentingCar() {
    return this.rentingCar;
 }

 removeRentingCar() {
    this.rentingCar == null
 }

 add(rental: Rental):Observable<ResponseModel>{
   let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, rental);
 }
}
