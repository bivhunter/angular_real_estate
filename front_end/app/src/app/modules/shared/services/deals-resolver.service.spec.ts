import { TestBed } from '@angular/core/testing';

import { DealsResolverService } from './deals-resolver.service';

describe('DealsResolverService', () => {
  let service: DealsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
