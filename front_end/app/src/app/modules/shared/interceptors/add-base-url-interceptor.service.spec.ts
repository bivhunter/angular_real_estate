import { TestBed } from '@angular/core/testing';

import { AddBaseUrlInterceptorService } from './add-base-url-interceptor.service';

describe('AddBaseUrlInterceptorService', () => {
  let service: AddBaseUrlInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBaseUrlInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
