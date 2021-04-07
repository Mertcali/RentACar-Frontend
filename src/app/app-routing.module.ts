import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add_operations/brand-add/brand-add.component';
import { CarAddComponent } from './components/add_operations/car-add/car-add.component';
import { ColorAddComponent } from './components/add_operations/color-add/color-add.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { OnecardetailComponent } from './components/onecardetail/onecardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brands/:brandId", component:CardetailComponent},
  {path:"cars/colors/:colorId", component:CardetailComponent},

  {path:"cars/:carId", component:OnecardetailComponent},
  {path:"cars/details/:carId", component:OnecardetailComponent},

  {path:"rental/:carId",component:RentalComponent},
  {path:"cars/rental/:carId",component:RentalComponent},

  {path:"payment/:carId",component: PaymentComponent},

  {path:"car/add",component:CarAddComponent},
  {path:"color/add", component:ColorAddComponent},
  {path:"brand/add",component:BrandAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
