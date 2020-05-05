import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StatusMessageService } from '../services/status-message.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private statusMessageService: StatusMessageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => this.errorHandler(error)),
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      this.statusMessageService.showMessage({
          status: 'error',
          text: 'Server is not respond. Try again'
      });
    }

    if (error.status === 500) {
      this.statusMessageService.showMessage({
          status: 'error',
          text: error.statusText
      });
    }
    return throwError(error);
  }
}
