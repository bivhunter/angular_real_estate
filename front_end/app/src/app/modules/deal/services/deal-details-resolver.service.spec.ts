import { TestBed } from '@angular/core/testing';

import { DealDetailsResolverService } from './deal-details-resolver.service';

describe('DealDetailsResolverService', () => {
  let service: DealDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
