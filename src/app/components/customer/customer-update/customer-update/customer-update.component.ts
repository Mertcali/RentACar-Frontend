import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customerUpdateForm: FormGroup
  id2 =Number(this.localStorageService.getItem('id'))

  constructor(    
    private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCustomerUpdateForm();
  }

  createCustomerUpdateForm() {
    
    this.customerUpdateForm = this.formBuilder.group({
      id:[this.id2,Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  update() {
    if (this.customerUpdateForm.valid) {
      let customerModel = Object.assign({}, this.customerUpdateForm.value);
      this.customerService.update(customerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error('Form eksik', 'Dikkat');
          }
        }
      );
    }
  }

}
