import { TestBed } from '@angular/core/testing';

import { ClientsFilteringService } from './clients-filtering.service';

describe('ClientsFilteringService', () => {
  let service: ClientsFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
