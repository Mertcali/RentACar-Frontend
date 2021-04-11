import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandColorComponent } from './brand-color.component';

describe('BrandColorComponent', () => {
  let component: BrandColorComponent;
  let fixture: ComponentFixture<BrandColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
