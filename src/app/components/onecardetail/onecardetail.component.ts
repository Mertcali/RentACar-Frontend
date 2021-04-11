import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Findex } from 'src/app/models/findex';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-onecardetail',
  templateUrl: './onecardetail.component.html',
  styleUrls: ['./onecardetail.component.css'],
})
export class OnecardetailComponent implements OnInit {
  constructor(
    private cardetailService: CardetailService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private toastrService:ToastrService,
    private authService:AuthService
  ) {}

  cars: CarDetail[] = [];
  rental: RentalDetail[];
  findex: Findex[] = [];
  user: CustomerDetail[]=[]
  dataLoaded = false;
  dataLoaded2 = false;
  imageBasePath = 'https://localhost:44378';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.getUsersById();
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.cardetailService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByCarId(carId: number) {
    this.cardetailService.getCarByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  checkLogin():boolean{
    return this.authService.isAuthenticated();
  }

  isCarRentable() {
    if(this.checkLogin()==true){
      if (this.cars[0].minFindex <= this.user[0].findexScore) {

        this.dataLoaded2 = true;
        this.toastrService.info("Findex uygun","Tarih Seçiniz")
        return true;
      }
      this.toastrService.warning("Findex puanınız yeterli değil","Başka araç deneyiniz")
      return false;
    }else{
      this.toastrService.warning("Lütfen Giriş yapınız", "Dikkat")
      return false;   
    }

  }
  getUsersById() {
    this.customerService
      .getCustomerByUserId(Number(this.localStorageService.getItem('id')))
      .subscribe((response) => {
        this.user = response.data;
      });
  }
}
