import { TestBed } from '@angular/core/testing';

import { HomeDetailsResolverService } from './home-details-resolver.service';

describe('HomeDetailsResolverService', () => {
  let service: HomeDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
