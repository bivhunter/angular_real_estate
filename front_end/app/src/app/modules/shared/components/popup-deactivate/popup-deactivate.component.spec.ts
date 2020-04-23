import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeactivateComponent } from './popup-deactivate.component';

describe('PopupDeactivateComponent', () => {
  let component: PopupDeactivateComponent;
  let fixture: ComponentFixture<PopupDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
