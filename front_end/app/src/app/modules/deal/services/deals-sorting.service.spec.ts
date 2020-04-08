import { TestBed } from '@angular/core/testing';

import { DealsSortingService } from './deals-sorting.service';

describe('DealsSortingService', () => {
  let service: DealsSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsSortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
