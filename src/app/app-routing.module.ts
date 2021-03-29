import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brands/:brandId", component:CardetailComponent},
  {path:"cars/colors/:colorId", component:CardetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
