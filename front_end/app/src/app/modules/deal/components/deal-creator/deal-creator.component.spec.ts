import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCreatorComponent } from './deal-creator.component';

describe('DealCreatorComponent', () => {
  let component: DealCreatorComponent;
  let fixture: ComponentFixture<DealCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
