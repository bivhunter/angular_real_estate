import { Injectable } from '@angular/core';
import { TViewMode } from '../../shared/types/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ClientsViewService {

  set viewMode(value: TViewMode) {
    localStorage.setItem('viewClientsMode', value);
  }

  get viewMode(): TViewMode {
    const mode = localStorage.getItem('viewClientsMode');
    if (!mode)  {
      return 'cards';
    }
    return mode as TViewMode;
  }

  viewModeBehaviorSubject: BehaviorSubject<TViewMode> = new BehaviorSubject(this.viewMode);


  constructor() { }

  getViewModeBehaviorSubject(): Observable<TViewMode> {
    return this.viewModeBehaviorSubject.asObservable();
  }

  setViewMode(viewMode: TViewMode) {
    this.viewMode = viewMode;
    this.viewModeBehaviorSubject.next(viewMode);
  }
}
