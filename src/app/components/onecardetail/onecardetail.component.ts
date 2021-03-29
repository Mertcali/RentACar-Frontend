import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-onecardetail',
  templateUrl: './onecardetail.component.html',
  styleUrls: ['./onecardetail.component.css']
})
export class OnecardetailComponent implements OnInit {

  constructor(private cardetailService:CardetailService, private activatedRoute:ActivatedRoute) { }
  cars:CarDetail[]=[]
  dataLoaded=false;
  imageBasePath="https://localhost:44378"

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    if(params["carId"]){
        this.getCarByCarId(params["carId"])
      }
      else{
        this.getCarDetails()
      }
    })
  }

  getCarDetails(){
    this.cardetailService.getCarDetails().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
    }

    getCarByCarId(carId:number){
      this.cardetailService.getCarByCarId(carId).subscribe(response=>{
        this.cars=response.data
        this.dataLoaded=true;
      })
    }
}
