import { TestBed } from '@angular/core/testing';

import { HomesViewService } from './homes-view.service';

describe('HomesViewService', () => {
  let service: HomesViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
