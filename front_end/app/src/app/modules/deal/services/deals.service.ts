import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Deal } from '../model/deal';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user.service';
import { StatusMessageService } from '../../shared/services/status-message.service';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private dealsUrl = `deal`; // add deals url

  private dealsListChangesSubject: Subject<any> = new Subject();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private statusMessageService: StatusMessageService
  ) { }

  getDeals(): Observable<Deal[]> {
    return this.http
      .get<Deal[]>(this.dealsUrl)
      .pipe(
        catchError(this.handleGetDealsError));
  }

  addDeal(deal: Deal): Observable<Deal> {
    return this.http
      .post<Deal>(this.dealsUrl, deal)
      .pipe(
        tap((newDeal) => {
          this.increaseUserLevel();
        }),
        catchError(this.handlePostDealError)
      );
  }

  getDeal(id: number | string): Observable<Deal> {
    return this.http
      .get<Deal>(`${this.dealsUrl}/${id}`)
      .pipe(
        catchError(this.handleGetDealError)
      );
  }

  getDealsListChangesEvent(): Observable<any> {
    return this.dealsListChangesSubject.asObservable();
  }

  private increaseUserLevel() {
    this.userService.increaseUserLevel().subscribe(
      () => this.statusMessageService.showMessage({
        status: 'info',
        text: `The Deal was made`
      })
    );
 }

  private handleGetDealError(error: HttpErrorResponse): Observable<Deal> {
    console.log(error);
    return throwError(error.statusText);
  }


  private handlePostDealError(error: HttpErrorResponse): Observable<Deal> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleGetDealsError(error: HttpErrorResponse): Observable<Deal[]> {
    console.log(error);
    return throwError(error.statusText);
  }

}
