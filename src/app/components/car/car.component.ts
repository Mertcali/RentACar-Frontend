import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarDetail[]=[]
  
  currentCar:CarDetail;
  nullCar:CarDetail;
<<<<<<< HEAD
  filterText="";
=======
>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac
  dataLoaded=false;

  constructor(private cardetailService:CardetailService) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.cardetailService.getCarDetails().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })

  }

  setCurrentCar(car:CarDetail){
    this.currentCar=car;
  }

  getCurrentCarClass(car:CarDetail){
    if(car == this.currentCar){
      return "list-group-item  list-group-item-warning"
    }else{
      return "list-group-item"
    }
  }

  getAllCarsClass(){
    if(!this.currentCar){
      return "list-group-item list-group-item-warning"
    }else{
      return "list-group-item"
    }
  }

  resetCurrentCar(){
    this.currentCar=this.nullCar;
  }
<<<<<<< HEAD
  
}




=======
}


>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac
