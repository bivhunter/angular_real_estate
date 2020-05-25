import { TestBed } from '@angular/core/testing';

import { ClientsPopupService } from './clients-popup.service';

describe('ClientsPopupService', () => {
  let service: ClientsPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
