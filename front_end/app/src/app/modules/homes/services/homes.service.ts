import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Home } from '../model/home';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { DealsService } from '../../deal/services/deals.service';
import { Deal } from '../../deal/model/deal';
import { Client } from '../../clients/model/client';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  baseUrl = 'http://localhost:3030/';
  homesUrl = `${this.baseUrl}home`; // add homes url

  homesListChangesSubject: Subject<any> = new Subject();

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient,
    private dealsService: DealsService
  ) { }

  getHomes(): Observable<Home[]> {
    // add clientOwnerId field to sold out home
    const mapHomes = (homes: Home[], deals: Deal[]): Home[] => {
      return homes.map(home => {
        for (const deal of deals) {
          if (home.id === deal.home.id) {
            return {...home, clientOwner: deal.client || new Client()};
          }
        }
        return home;
      });
    };

    const homesObservable = this.dealsService.getDeals()
      .pipe(switchMap(deals => {
        return this.http
        .get<Home[]>(this.homesUrl, this.getHttpAuthOption())
        .pipe(map(homes => mapHomes(homes, deals)))
        .pipe(
          tap((homes) => console.log(homes)),
          catchError(this.handleGetHomesError)
        );
      }));

    return homesObservable;
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
    return this.dealsService.getDeals().pipe(
      switchMap(deals => {
       return  this.http
      .get<Home>(`${this.homesUrl}/${id}`, this.getHttpAuthOption())
      .pipe(map(
        home => {
          for (const deal of deals) {
            if (deal.homeId === home.id) {
              return {...home, clientOwner: deal.client || new Client()};
            }
          }
          return home;
        }
      ))
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handleGetHomeError)
      );
      })
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
