import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  private messageChangesSubject: Subject<string> = new Subject();

  constructor() { }

  getStatusMessageEvent(): Observable<string> {
    return this.messageChangesSubject.asObservable();
  }

  showMessage(message: string): void {
    this.messageChangesSubject.next(message);
  }
}
