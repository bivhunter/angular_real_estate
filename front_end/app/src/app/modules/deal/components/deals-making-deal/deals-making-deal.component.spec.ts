import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsMakingDealComponent } from './deals-making-deal.component';

describe('DealsMakingDealComponent', () => {
  let component: DealsMakingDealComponent;
  let fixture: ComponentFixture<DealsMakingDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsMakingDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsMakingDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
