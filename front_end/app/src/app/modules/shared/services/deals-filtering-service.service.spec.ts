import { TestBed } from '@angular/core/testing';

import { DealsFilteringServiceService } from './deals-filtering-service.service';

describe('DealsFilteringServiceService', () => {
  let service: DealsFilteringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsFilteringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
