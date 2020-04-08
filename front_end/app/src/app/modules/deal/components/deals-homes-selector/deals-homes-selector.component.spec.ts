import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsHomesSelectorComponent } from './deals-homes-selector.component';

describe('DealsHomesSelectorComponent', () => {
  let component: DealsHomesSelectorComponent;
  let fixture: ComponentFixture<DealsHomesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsHomesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsHomesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
