import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TMessage } from '../types/types';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  private messageChangesSubject: Subject<TMessage> = new Subject();

  constructor(private snackBar: MatSnackBar) { }

  getStatusMessageEvent(): Observable<TMessage> {
    return this.messageChangesSubject.asObservable();
  }

  showMessage(message: TMessage): void {
    this.snackBar.open(message.text, 'close', {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}
