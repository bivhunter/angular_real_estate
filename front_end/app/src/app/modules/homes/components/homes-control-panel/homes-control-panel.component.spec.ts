import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesControlPanelComponent } from './homes-control-panel.component';

describe('HomesControlPanelComponent', () => {
  let component: HomesControlPanelComponent;
  let fixture: ComponentFixture<HomesControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
