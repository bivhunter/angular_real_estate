import { TestBed } from '@angular/core/testing';

import { DealsViewService } from './deals-view.service';

describe('DealsViewService', () => {
  let service: DealsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
