import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsControlPanelComponent } from './clients-control-panel.component';

describe('ClientsControlPanelComponent', () => {
  let component: ClientsControlPanelComponent;
  let fixture: ComponentFixture<ClientsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
