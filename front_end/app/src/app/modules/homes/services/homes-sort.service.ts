import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THomesSortingMethod, THomesSortingField } from '../../shared/types/types';

@Injectable()
export class HomesSortService {

  sortingMethod: THomesSortingMethod = 'HOME_UP';

  changingHomesSortingMethodBehaviorSubject:
    BehaviorSubject<THomesSortingMethod> = new BehaviorSubject(this.sortingMethod);

  constructor() { }

  getChangingHomesSortingMethodEvent(): Observable<THomesSortingMethod> {
    return this.changingHomesSortingMethodBehaviorSubject.asObservable();
  }

  selectHomesSortingMethod(field: THomesSortingField) {
    let newSortingMethod: THomesSortingMethod;
    if (this.sortingMethod === `${field}_UP`) {
      newSortingMethod = `${field}_DOWN` as THomesSortingMethod;
    } else {
      newSortingMethod = `${field}_UP` as THomesSortingMethod;
    }
    this.setHomesSortingMethod(newSortingMethod);
  }

  setHomesSortingMethod(method: THomesSortingMethod): void {
    this.sortingMethod = method;
    this.changingHomesSortingMethodBehaviorSubject.next(method);
  }
}
