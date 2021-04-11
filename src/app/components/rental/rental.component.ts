import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  dataLoaded = false;

  rental: Rental;
  rentalKey:Rental;
  carId: number;
  addRentCarForm: FormGroup;
  currentDate: Date = new Date();
  id2 =Number(this.localStorageService.getItem('id'))

  constructor(private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService:LocalStorageService
    ) {}

  ngOnInit(): void {
    this.carId=Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    this.createAddRentCarForm();

  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
       carId: [this.carId, Validators.required],
       userId: [this.id2, Validators.required],
       rentDate: ['', [Validators.required]],
       returnDate: ['', Validators.required]
    });
 }

 setRentingCar() {
  if (this.addRentCarForm.invalid) {
     this.toastrService.warning('Alanları kontrol ediniz', 'Dikkat');
     return false;
  }

  this.rental = this.addRentCarForm.value;
  let rentDate = new Date(this.rental.rentDate);
  let returnDate = new Date(this.rental.returnDate);

  if (rentDate < this.currentDate) {
     this.toastrService.warning(
        'Kiralama Tarihi, bu günden sonraki günler olmalıdır', 'Dikkat'
     );
     return false;
  }

  if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
     this.toastrService.warning(
        'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat'
     );
     return false;
  }

  this.rentalService.setRentingCar(this.rental);
  console.log(this.rental)

  this.toastrService.success('Ödeme sayfasına yönlendiriliyorsunuz');
   return this.router.navigate(['payment/' + JSON.stringify(this.rental)]);
   
}

checkCarRentable() {
  this.rentalService.getRentalByCarId(this.carId).subscribe(responseSuccess => {

     if (responseSuccess.data[0] == null) {
        this.setRentingCar();
        return true;
     }

     let lastItem = responseSuccess.data[responseSuccess.data.length - 1];
 


     if (lastItem.returnDate == null )  { 
        return this.toastrService.error('Bu araç henüz teslim edilmemiş');
     }

     let returnDate = new Date(lastItem.returnDate);
     this.setRentingCar();

     return true;
  });
}



}
