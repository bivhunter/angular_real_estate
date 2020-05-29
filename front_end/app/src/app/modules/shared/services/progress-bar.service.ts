import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private progressBarSubject: Subject<boolean> = new Subject();
  constructor() { }

  openProgressBar(): void {
    this.progressBarSubject.next(true);
  }

  closeProgressBar(): void {
    this.progressBarSubject.next(false);
  }

  getProgressBarEvent(): Observable<boolean> {
    return this.progressBarSubject.asObservable();
  }
}
