import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add_operations/brand-add/brand-add.component';
import { CarAddComponent } from './components/add_operations/car-add/car-add.component';
import { ColorAddComponent } from './components/add_operations/color-add/color-add.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update/customer-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { OnecardetailComponent } from './components/onecardetail/onecardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brands/:brandId", component:CardetailComponent},
  {path:"cars/colors/:colorId", component:CardetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CardetailComponent},

  {path:"cars/:carId", component:OnecardetailComponent},
  {path:"cars/details/:carId", component:OnecardetailComponent},

  {path:"rental/:carId",component:RentalComponent},
  {path:"cars/rental/:carId",component:RentalComponent},

  {path:"payment/:rental",component: PaymentComponent},

  {path:"car/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"color/add", component:ColorAddComponent},
  {path:"brand/add",component:BrandAddComponent},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:CustomerComponent},
  {path:"updateprofile",component:CustomerUpdateComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
