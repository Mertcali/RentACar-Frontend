import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-brand-color',
  templateUrl: './brand-color.component.html',
  styleUrls: ['./brand-color.component.css'],
})
export class BrandColorComponent implements OnInit {

  brands: Brand[];
  colors: Color[];

  brandId: Number;
  brandFilterText: string
  colorId: Number;
  colorFilterText: string;

 

  constructor(
    private brandService: BrandService,
    private colorService:ColorService,
    private router:Router,
    private toastrService:ToastrService

  ) {}

  ngOnInit(): void {
 this.colorAndBrandGetAll();

  }

  colorAndBrandGetAll() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getSelectedBrand(brandId: Number) {
    if (this.brandId == brandId) {
      return true;
    }
    else {
      return false;
    }
  }

  getSelectedColor(colorId: Number) {
    if (this.colorId == colorId) {
      return true;
    }
    else {
      return false;
    }
  }



}
