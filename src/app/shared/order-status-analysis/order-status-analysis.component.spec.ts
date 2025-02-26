import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusAnalysisComponent } from './order-status-analysis.component';

describe('OrderStatusAnalysisComponent', () => {
  let component: OrderStatusAnalysisComponent;
  let fixture: ComponentFixture<OrderStatusAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatusAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatusAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
