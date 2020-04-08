import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsClientsSelectorComponent } from './deals-clients-selector.component';

describe('DealsClientsSelectorComponent', () => {
  let component: DealsClientsSelectorComponent;
  let fixture: ComponentFixture<DealsClientsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsClientsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsClientsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
