import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsControlPanelComponent } from './deals-control-panel.component';

describe('DealsControlPanelComponent', () => {
  let component: DealsControlPanelComponent;
  let fixture: ComponentFixture<DealsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
