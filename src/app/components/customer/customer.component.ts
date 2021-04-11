import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  user:CustomerDetail[]=[]
  dataLoaded=false;
  constructor(private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {

    this.getUsersById();
  }

  getCustomers(){
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.user=response.data
      this.dataLoaded=true;
    })
  }

  getUsersById() {
    let id =Number(this.localStorageService.getItem('id'))
    if(id!=null){ 
    this.customerService
      .getCustomerByUserId(id)
      .subscribe((response) => {
        this.user = response.data;
      })};
  }

  goUpdate(){
this.router.navigate(["updateprofile"])
  }

}
