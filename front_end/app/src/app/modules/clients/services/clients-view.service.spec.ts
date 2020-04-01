import { TestBed } from '@angular/core/testing';

import { ClientsViewService } from './clients-view.service';

describe('ClientsViewService', () => {
  let service: ClientsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
