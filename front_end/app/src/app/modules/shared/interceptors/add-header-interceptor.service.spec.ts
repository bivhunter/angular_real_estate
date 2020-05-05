import { TestBed } from '@angular/core/testing';

import { AddHeaderInterceptorService } from './add-header-interceptor.service';

describe('AddHeaderInterceptorService', () => {
  let service: AddHeaderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHeaderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
