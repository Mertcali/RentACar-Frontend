import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FakeCardService } from 'src/app/services/fake-card.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FakeCard } from 'src/app/models/fakeCard';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { CardetailService } from 'src/app/services/cardetail.service';
import { CarDetail } from 'src/app/models/cardetail';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  userCards:FakeCard[]=[]
  rental:Rental
  card:FakeCard;
  amountOfPayment:number;
  carDetail:CarDetail;
  registeredCardCheck:boolean;
  id2 =Number(this.localStorageService.getItem('id'))

  constructor(
    private fakeCardService: FakeCardService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private carDetailService:CardetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['rental']){
        this.createPaymentForm();
        this.rental=JSON.parse(params['rental'])
        console.log(this.rental)
        this.getCards();
        this.getCarDetailsById();
        this.paymentCalculator();
        this.saveCard();
      }
    })

  }

  getCarDetailsById(){
    this.carDetailService.getCarByCarId(this.rental.carId).subscribe(response=>{
      this.carDetail=response.data[0]
      console.log(this.carDetail)
      this.paymentCalculator()
      console.log(this.amountOfPayment)
    })
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      userId:[this.id2,Validators.required],
      cardNumber: ['', Validators.required],
      cardCVV: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      lastNameOnCard:['', Validators.required],
      expirationDateMonth: ['', Validators.required],
      expirationDateYear: ['', Validators.required],
    });
  }

  paymentCheck() {
    let paymentModel = Object.assign({}, this.paymentForm.value);
    console.log(paymentModel);
    this.fakeCardService.isCardExist(paymentModel).subscribe(
      (response) => {
        
        if(this.userCards[0].moneyInCard >= this.amountOfPayment){
          this.userCards[0].moneyInCard=this.userCards[0].moneyInCard - this.amountOfPayment;
          this.toastrService.success("Ödeme alındı","Bakiye yeterli")
          this.toastrService.success('Ödeme Bilgileri Onaylandı','İşlem Başarılı');
          this.addRental();
        }else{
          this.toastrService.error("Yeterli miktarda para yok","Dikkat")
        }     
      },
      (responseError) => {
        this.toastrService.error(
          'Ödeme Bilgileri Onaylanmadı, Tekrar deneyin.',
          'İşlem Başarısız'
        );

        this.router.navigate(['payment/' + JSON.stringify(this.rental)]);
      }
    );
  }

  getCards(){
    this.fakeCardService.getCardByUserId(this.id2).subscribe(response=>{
      this.userCards=response.data
      console.log(this.userCards)
    })

  }

  addRental(){
    
    this.rentalService.add(this.rental).subscribe(response=>{
      this.toastrService.success(response.message,"Kira oluşturuldu")
    })
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate);
      var date2 = new Date(this.rental.rentDate);
      var difference = date1.getTime() - date2.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetail?.dailyPrice;
      console.log(this.amountOfPayment)
    }
  }


  registeredCard(event: any) {
    if (event.target.checked) {
      this.registeredCardCheck = true;
    } else {
      this.registeredCardCheck = false;
    }
  }

  saveCard(){
    if(this.registeredCardCheck==true){
      let cardModel = Object.assign({},this.paymentForm.value)
      this.fakeCardService.add(cardModel).subscribe(response=>{
        this.toastrService.success("Eklendi")
      },(responseError=>{
        this.toastrService.error("Kaydedilemedi")
      }))
    }
  }




  



}
