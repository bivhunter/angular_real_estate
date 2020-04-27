import { TestBed } from '@angular/core/testing';

import { ClientsResolverService } from './clients-resolver.service';

describe('ClientsResolverService', () => {
  let service: ClientsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
