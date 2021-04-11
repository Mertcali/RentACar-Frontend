import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  user:CustomerDetail[]=[]

  constructor(
    private authService:AuthService,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
      this.getUsersById();
  }
  

  checkLogin():boolean{
    return this.authService.isAuthenticated();
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

  logout(){
    this.authService.logout();
    this.router.navigate(["/cars"])
  }

}
