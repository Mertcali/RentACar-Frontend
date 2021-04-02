import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';
=======
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';
>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac

@Component({
  selector: 'app-onecardetail',
  templateUrl: './onecardetail.component.html',
  styleUrls: ['./onecardetail.component.css']
})
export class OnecardetailComponent implements OnInit {

<<<<<<< HEAD
  constructor(private cardetailService:CardetailService, private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentService:RentalService
    ) { }

  cars:CarDetail[]=[]
  rental:RentalDetail[]
  dataLoaded=false;
  imageBasePath="https://localhost:44378"


  

=======
  constructor(private cardetailService:CardetailService, private activatedRoute:ActivatedRoute) { }
  cars:CarDetail[]=[]
  dataLoaded=false;
  imageBasePath="https://localhost:44378"

>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac
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
<<<<<<< HEAD
    rentTest(car:CarDetail){
      this.toastrService.success("Kiralandı",car.brandName + " " + car.carName)
    }


    
=======
>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac
}
