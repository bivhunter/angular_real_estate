import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './add-header-interceptor.service';
import { AddBaseUrlInterceptor } from './add-base-url-interceptor.service';
import { ErrorsInterceptor } from './errors-interceptor.service';

export const httpInterceptorProviders  = [
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AddBaseUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
];

