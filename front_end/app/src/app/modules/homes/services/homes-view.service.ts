import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TViewMode } from '../../shared/types/types';

@Injectable()
export class HomesViewService {

  private set viewMode(value: TViewMode) {
    localStorage.setItem('viewHomesMode', value);
  }

  private get viewMode(): TViewMode {
    const mode = localStorage.getItem('viewHomesMode');
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
