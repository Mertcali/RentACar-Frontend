import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { OnecardetailComponent } from './components/onecardetail/onecardetail.component';
<<<<<<< HEAD
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
=======
>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac

const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brands/:brandId", component:CardetailComponent},
  {path:"cars/colors/:colorId", component:CardetailComponent},
<<<<<<< HEAD

  {path:"cars/:carId", component:OnecardetailComponent},
  {path:"cars/details/:carId", component:OnecardetailComponent},

  {path:"rental/:carId",component:RentalComponent},
  {path:"cars/rental/:carId",component:RentalComponent},

  {path:"payment/:carId",component: PaymentComponent},
=======
  {path:"cars/:carId", component:OnecardetailComponent}
>>>>>>> 7a9d488d8049f57d043132d29c7bb169f66dd8ac
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
