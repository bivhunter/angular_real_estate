import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddBaseUrlInterceptor implements HttpInterceptor {

  private baseUrl = 'http://localhost:3030/';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newUrl = this.baseUrl + req.url;
    const newReq = req.clone({
      url: newUrl
    });
    return next.handle(newReq);
  }
}
