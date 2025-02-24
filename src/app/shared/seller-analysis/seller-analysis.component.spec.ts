import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAnalysisComponent } from './seller-analysis.component';

describe('SellerAnalysisComponent', () => {
  let component: SellerAnalysisComponent;
  let fixture: ComponentFixture<SellerAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
