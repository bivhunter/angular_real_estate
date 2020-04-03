import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesListSelectorComponent } from './homes-list-selector.component';

describe('HomesListSelectorComponent', () => {
  let component: HomesListSelectorComponent;
  let fixture: ComponentFixture<HomesListSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesListSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
