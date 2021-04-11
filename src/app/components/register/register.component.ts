import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Findex } from 'src/app/models/findex';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm:FormGroup;
  findex:Findex;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private findexService:FindexService,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        //this.setIdToLocalStorage(registerModel.email)
        //this.setFindexToZero(0)
        this.toastrService.info(response.message,"Giriş ekranına yönlendiriliyorsunuz")
        this.router.navigate(["login"])

      },responseError=>{
        this.toastrService.error(responseError.error,"Form eksik.")
      })
    }
  }



//---> Yeni kayıt olan birinin findex puanını otomatik 0 olarak veritabanına yollamak istedim. Bunu backend tarafında çok daha kolay yapabiliriz. 
//  Sadece bir şeyler kurcaladım.
  // setIdToLocalStorage(email:string){
  //   this.customerService.getCustomerWithMail(email).subscribe(response=>{
  //     this.localStorageService.setItem("id",(response.data[0].userId).toString())
  //   })
  // }

  // setFindexToZero(findexscore:number){
  //   this.findex={findexScore:findexscore, userId:Number(this.localStorageService.getItem('id'))}
  //   this.findexService.add(this.findex).subscribe(response=>{
  //     this.toastrService.info("Findex puanınız 0","Dikkat")
  //   },)
  // }
  

}
