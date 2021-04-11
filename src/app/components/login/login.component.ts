import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      console.log(loginModel)
      this.authService.login(loginModel).subscribe(response=>{
        this.setIdToLocalStorage(loginModel.email)
        this.toastrService.info(response.message,"Ana sayfaya yönlendiriliyorsunuz.")
        this.localStorageService.setItem("token",response.data.token)
        this.router.navigate(["cars"])
        
      }, responseError=>{
        this.toastrService.error(responseError.error,"Tekrar deneyin.")
      })

    }else{
      this.toastrService.error("Lütfen bilgileri eksiksiz giriniz")
    }

  }

  
  setIdToLocalStorage(email:string){
    this.customerService.getCustomerWithMail(email).subscribe(response=>{
      console.log(response.data)
      this.localStorageService.setItem("id",(response.data[0].userId).toString())
    })
  }



}
