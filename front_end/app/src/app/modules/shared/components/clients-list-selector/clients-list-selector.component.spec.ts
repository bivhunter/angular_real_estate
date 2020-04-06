import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListSelectorComponent } from './clients-list-selector.component';

describe('ClientsListSelectorComponent', () => {
  let component: ClientsListSelectorComponent;
  let fixture: ComponentFixture<ClientsListSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsListSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
