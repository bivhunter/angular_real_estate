import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  isVisible: boolean;
  private authorizationEvent: Subject<boolean> = new Subject();

  constructor() { }

  getAuthorizationEvent(): Observable<boolean> {
    return this.authorizationEvent.asObservable();
  }

  open(): void {
    console.log('open')
    this.authorizationEvent.next(true);
  }

  close(): void {
    console.log('close')
    this.authorizationEvent.next(false);
  }

}
