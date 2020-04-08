import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Deal } from '../../deal/model/deal';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  baseUrl = 'http://localhost:3030/';
  dealsUrl = `${this.baseUrl}deal`; // add deals url

  dealsListChangesSubject: Subject<any> = new Subject();

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient
  ) { }

  getDeals(): Observable<Deal[]> {
    return this.http
      .get<Deal[]>(this.dealsUrl, this.getHttpAuthOption())
      .pipe(
        tap((dealsList) => console.log(dealsList)),
        catchError(this.handleGetDealsError));
  }

  addDeal(deal: Deal): Observable<Deal> {
    return this.http
      .post<Deal>(this.dealsUrl, deal, this.getHttpAuthOption())
      .pipe(
        tap((newDeal) => console.log(newDeal)),
        catchError(this.handlePostDealError)
      );
  }

  getDeal(id: number | string): Observable<Deal> {
    return this.http
      .get<Deal>(`${this.dealsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handleGetDealError)
      );
  }

  getDealsListChangesEvent(): Observable<any> {
    return this.dealsListChangesSubject.asObservable();
  }

  private updateDealsList(): void {
    this.dealsListChangesSubject
      .next('');
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
