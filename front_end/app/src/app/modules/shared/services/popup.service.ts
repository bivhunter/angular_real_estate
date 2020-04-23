import { Injectable } from '@angular/core';
import { Subject, Observable, of, from } from 'rxjs';
import { first, take, tap, map, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class PopupService {

  private routeDeactivateSubject: Subject<boolean> = new Subject();

  constructor() {
    console.log('service init')
  }

  submitRouteDeactivate(): void {
    console.log('submitRouteDeactivate')
    this.routeDeactivateSubject.next(true);
  }

  cancelRouteDeactivate(): void {
    this.routeDeactivateSubject.next(false);
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    return this.routeDeactivateSubject.asObservable().pipe(
      tap(() => console.log('tap')),
    );
  }

}
