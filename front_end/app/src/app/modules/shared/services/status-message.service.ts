import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TMessage } from '../types/types';



@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  private messageChangesSubject: Subject<TMessage> = new Subject();

  constructor() { }

  getStatusMessageEvent(): Observable<TMessage> {
    return this.messageChangesSubject.asObservable();
  }

  showMessage(message: TMessage): void {
    this.messageChangesSubject.next(message);
  }
}
