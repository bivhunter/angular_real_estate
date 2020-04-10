import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private routeDeactivateSubject: Subject<boolean> = new Subject();

  constructor() { }

  getRouteDeactivateEvent(): Observable<boolean> {
    console.log('getRouteDeactivateEvent')
    return this.routeDeactivateSubject.asObservable();
  }

  submitRouteDeactivate(): void {
    console.log('submitRouteDeactivate')
    this.routeDeactivateSubject.next(true);
  }

  cancelRouteDiactivate(): void {
    this.routeDeactivateSubject.next(false);
  }

}
