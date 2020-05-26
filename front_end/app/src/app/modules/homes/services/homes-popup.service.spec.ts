import { TestBed } from '@angular/core/testing';

import { HomesPopupService } from './homes-popup.service';

describe('HomesPopupService', () => {
  let service: HomesPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
