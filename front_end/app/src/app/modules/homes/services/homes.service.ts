import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Home } from '../model/home';
import { tap, catchError, map, switchMap, delay } from 'rxjs/operators';
import { DealsService } from '../../deal/services/deals.service';
import { Deal } from '../../deal/model/deal';
import { Client } from '../../clients/model/client';
import { StatusMessageService } from '../../shared/services/status-message.service';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  private homesUrl = `home`; // add homes url

  private homesListChangesSubject: Subject<any> = new Subject();

  
  constructor(
    private http: HttpClient,
    private dealsService: DealsService,
    private statusMessageService: StatusMessageService
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
        .get<Home[]>(this.homesUrl)
        .pipe(map(homes => mapHomes(homes, deals)))
        .pipe(
          catchError(this.handleGetHomesError)
        );
      }));

    return homesObservable;
  }

  addHome(home: Home): Observable<Home> {
    return this.http
      .post<Home>(this.homesUrl, home)
      .pipe(
        tap(newHome => this.statusMessageService.showMessage({
          status: 'info',
          text: `New home was added`
        })),
        catchError(this.handlePostHomeError)
      );
  }

  deleteHome(id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.homesUrl}/${id}`)
      .pipe(
        tap(() => {
          this.updateHomesList();
          this.statusMessageService.showMessage({
            status: 'info',
            text: `Home was removed`
          });
        }),
        catchError(this.handleDeleteHomeError)
      );
  }

  getHome(id: number | string): Observable<Home> {
    return this.dealsService.getDeals().pipe(
      switchMap(deals => {
       return  this.http
      .get<Home>(`${this.homesUrl}/${id}`)
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
        catchError(this.handleGetHomeError)
      );
      })
    );
  }

  updateHome(home: Home): Observable<Home> {
    return this.http
      .patch<Home>(`${this.homesUrl}/${home.id}`, home)
      .pipe(
        tap(newHome => this.statusMessageService.showMessage({
          status: 'info',
          text: `New Home was added`
        })),
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

}
