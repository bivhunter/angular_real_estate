import { TestBed } from '@angular/core/testing';

import { DealsFilteringService } from './deals-filtering.service';

describe('DealsFilteringService', () => {
  let service: DealsFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
