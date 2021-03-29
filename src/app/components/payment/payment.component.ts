import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FakeCardService } from 'src/app/services/fake-card.service';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { RentalService } from 'src/app/services/rental.service';
import { CardetailService} from 'src/app/services/cardetail.service';
import { Rental } from 'src/app/models/rental';
import { FakeCard } from 'src/app/models/fakeCard';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  creditCard:FakeCard;
  cars:CarDetail;
  rental:Rental;
  totalPrice:number;
  dataLoaded=false;
  carId:number;
  rentDate:Date;
  returnDate:Date;
  
  


  constructor(
    private creditCardService:FakeCardService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private carService:CardetailService,
    
    
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       
       this.carId=parseInt(params["carId"]);
       this.getRentalByCarId(params["carId"]);
       this.getCarDetails(params["carId"]);
       this.createPaymentForm();
       
       this.getRentSummary(this.rentDate,this.returnDate); 
       
      }

    })
  }
  getRentSummary(date1:Date,date2:Date) {
  
   
    var difference = date2.getTime() - date1.getTime()
    console.log(difference)
    var totalDate = Math.ceil(difference / (1000 * 3600 * 24))
    this.totalPrice = totalDate * this.cars.dailyPrice
    return this.totalPrice;
     
    }


 createPaymentForm(){
   this.paymentForm=this.formBuilder.group({
    customerId:[0,Validators.required],
    cardNumber:["",Validators.required,Validators.length==12],
    cardCVV:["",Validators.required,Validators.length==3],
    nameOnCard:["",Validators.required],
    expirationDate:["",Validators.required,Validators.length==5],
   })
   
 }

 addCreditCard(){
  if (this.paymentForm.valid) {
     let cardModel=Object.assign({},this.paymentForm.value)
     this.creditCardService.addCard(cardModel).subscribe(response=>{
     this.toastrService.success(response.message,"BAŞARILI")
     });

   } else {
     this.toastrService.error("Kart Bilgilerinizi Kontrol Ediniz","HATA!")
     
   }
 }
 getCarDetails(carId:number){
  let car= this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
    this.cars=response.data[0];

  })
  console.log(car);
}
getRentalByCarId(carId:number){
 let rental= this.rentalService.getRentalDetailByCarId(carId).subscribe(response=>{
    this.rental=response.data[0];

   console.log(rental)
  })
 
  
}
deleteRental(){
  let rental=Object.assign({},this.getRentalByCarId(this.carId));
  console.log(rental)
  
}
 
 
}