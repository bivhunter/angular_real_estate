import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesListComponent } from './homes-list.component';

describe('HomesListComponent', () => {
  let component: HomesListComponent;
  let fixture: ComponentFixture<HomesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
