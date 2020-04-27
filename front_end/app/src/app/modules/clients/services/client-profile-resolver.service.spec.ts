import { TestBed } from '@angular/core/testing';

import { ClientProfileResolverService } from './client-profile-resolver.service';

describe('ClientProfileResolverService', () => {
  let service: ClientProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
