import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateComponent } from './seller-update.component';

describe('SellerUpdateComponent', () => {
  let component: SellerUpdateComponent;
  let fixture: ComponentFixture<SellerUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdateComponent]
    });
    fixture = TestBed.createComponent(SellerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
