import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Home } from './model/home';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HomesService {

  baseUrl = 'http://localhost:3030/';
  homesUrl = `${this.baseUrl}home`; // add homes url

  homesSortSubject: Subject<string> = new Subject();
  homesSortMethodBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject('');

  homesListChangesSubject: Subject<any> = new Subject();

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient
  ) { }

  gethomes(): Observable<Home[]> {
    return this.http
      .get<Home[]>(this.homesUrl, this.getHttpAuthOption())
      .pipe(
        tap((homesList) => console.log(homesList)),
        catchError(this.handleGetHomesError));
  }

  addHome(home: Home): Observable<Home> {
    return this.http
      .post<Home>(this.homesUrl, home, this.getHttpAuthOption())
      .pipe(
        tap((newHome) => console.log(newHome)),
        catchError(this.handlePostHomeError)
      );
  }

  deleteHome(id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.homesUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap(() => this.updateHomesList()),
        catchError(this.handleDeleteHomeError)
      );
  }

  getHome(id: number | string): Observable<Home> {
    return this.http
      .get<Home>(`${this.homesUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handleGetHomeError)
      );
  }

  updateHome(home: Home): Observable<Home> {
    return this.http
      .patch<Home>(`${this.homesUrl}/${home.id}`, home, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handlePatchHomeError)
      );
  }

  gethomesSortSubject(): Observable<string> {
    return this.homesSortSubject.asObservable();
  }

  gethomesSortMethodSubject(): Observable<string> {
    return this.homesSortMethodBehaviorSubject.asObservable();
  }

  sorthomes(sortMethod: string): void {
    this.homesSortSubject.next(sortMethod);
  }

  setSorthomesMethod(sortMethod: string): void {
    this.homesSortMethodBehaviorSubject.next(sortMethod);
  }

  getHomesListChangesEvent(): Observable<any> {
    return this.homesListChangesSubject.asObservable();
  }

  private updateHomesList(): void {
    this.homesListChangesSubject
      .next('');
  }

  private handlePatchHomeError(error: HttpErrorResponse): Observable<Home> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleGetHomeError(error: HttpErrorResponse): Observable<Home> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleDeleteHomeError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handlePostHomeError(error: HttpErrorResponse): Observable<Home> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleGetHomesError(error: HttpErrorResponse): Observable<Home[]> {
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
