import { TestBed } from '@angular/core/testing';

import { HomesSortService } from './homes-sort.service';

describe('HomesSortService', () => {
  let service: HomesSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
