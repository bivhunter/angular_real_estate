import { TestBed } from '@angular/core/testing';

import { HomesFilterService } from './homes-filter.service';

describe('HomesFilterService', () => {
  let service: HomesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
