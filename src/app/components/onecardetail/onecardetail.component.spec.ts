import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnecardetailComponent } from './onecardetail.component';

describe('OnecardetailComponent', () => {
  let component: OnecardetailComponent;
  let fixture: ComponentFixture<OnecardetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnecardetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnecardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
