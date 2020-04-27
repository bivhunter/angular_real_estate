import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Deal } from '../model/deal';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private baseUrl = 'http://localhost:3030/';
  private dealsUrl = `${this.baseUrl}deal`; // add deals url

  private dealsListChangesSubject: Subject<any> = new Subject();

  private set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  private get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getDeals(): Observable<Deal[]> {
    return this.http
      .get<Deal[]>(this.dealsUrl, this.getHttpAuthOption())
      .pipe(
        catchError(this.handleGetDealsError));
  }

  addDeal(deal: Deal): Observable<Deal> {
    return this.http
      .post<Deal>(this.dealsUrl, deal, this.getHttpAuthOption())
      .pipe(
        tap((newDeal) => {
          this.increaseUserLevel();
        }),
        catchError(this.handlePostDealError)
      );
  }

  getDeal(id: number | string): Observable<Deal> {
    return this.http
      .get<Deal>(`${this.dealsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        catchError(this.handleGetDealError)
      );
  }

  getDealsListChangesEvent(): Observable<any> {
    return this.dealsListChangesSubject.asObservable();
  }

  private increaseUserLevel() {
    this.userService.increaseUserLevel().subscribe();
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

  private getHttpAuthOption() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      })
    };
  }
}
