import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  carDetails:CarDetail[]=[];
  carImages:CarDetail[]=[];
  car:CarDetail;

  imageBasePath="https://localhost:44378"
  dataLoaded=true;

  constructor(private cardetailService:CardetailService,
    private activatedRoute:ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarDetailsByBrandId(params["brandId"])
      }else if(params["colorId"]){
        this.getCarDetailsByColorId(params["colorId"])
      }
      else{
        this.getCarDetails()
      }
    })
  }


  getCarDetails(){
  this.cardetailService.getCarDetails().subscribe(response=>{
    this.carDetails=response.data
    this.dataLoaded=true;
  })
  }
  
  getCarDetailsByBrandId(brandId:number){
    this.cardetailService.getCarDetailsByBrandId(brandId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded=true;
    })
    }

    getCarDetailsByColorId(colorId:number){
      this.cardetailService.getCarDetailsByColorId(colorId).subscribe(response=>{
        this.carDetails=response.data
        this.dataLoaded=true;
      })
      }

}
