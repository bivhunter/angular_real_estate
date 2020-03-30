import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesTableComponent } from './homes-table.component';

describe('HomesTableComponent', () => {
  let component: HomesTableComponent;
  let fixture: ComponentFixture<HomesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
