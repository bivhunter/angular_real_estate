import { TestBed } from '@angular/core/testing';

import { ClientsSortingService } from './clients-sorting.service';

describe('ClientsSortingService', () => {
  let service: ClientsSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsSortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
