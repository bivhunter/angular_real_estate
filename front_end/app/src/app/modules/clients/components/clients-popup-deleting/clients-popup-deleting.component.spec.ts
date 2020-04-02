import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsPopupDeletingComponent } from './clients-popup-deleting.component';

describe('ClientsPopupDeletingComponent', () => {
  let component: ClientsPopupDeletingComponent;
  let fixture: ComponentFixture<ClientsPopupDeletingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsPopupDeletingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsPopupDeletingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
