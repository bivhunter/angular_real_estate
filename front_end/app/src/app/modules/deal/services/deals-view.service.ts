import { Injectable } from '@angular/core';
import { TViewMode } from '../../shared/types/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class DealsViewService {
  private set viewMode(value: TViewMode) {
    localStorage.setItem('viewDealsMode', value);
  }

  private get viewMode(): TViewMode {
    const mode = localStorage.getItem('viewDealsMode');
    if (!mode)  {
      return 'cards';
    }
    return mode as TViewMode;
  }

  private viewModeBehaviorSubject: BehaviorSubject<TViewMode> = new BehaviorSubject(this.viewMode);


  constructor() { }

  getViewModeBehaviorSubject(): Observable<TViewMode> {
    return this.viewModeBehaviorSubject.asObservable();
  }

  setViewMode(viewMode: TViewMode) {
    this.viewMode = viewMode;
    this.viewModeBehaviorSubject.next(viewMode);
  }
}
