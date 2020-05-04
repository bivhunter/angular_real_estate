import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THomesSortingMethod, THomesSortingField } from '../../shared/types/types';
import { Home } from '../model/home';

@Injectable()
export class HomesSortService {

  private sortingMethod: THomesSortingMethod = 'HOME_UP';

  private changingHomesSortingMethodBehaviorSubject:
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

  sortHomes(homes: Home[], method: THomesSortingMethod): Home[] {
    if (!homes.length) {
      return [];
    }
    return createSortFunc()[method](homes);
  }

  private setHomesSortingMethod(method: THomesSortingMethod): void {
    this.sortingMethod = method;
    this.changingHomesSortingMethodBehaviorSubject.next(method);
  }
}



// functions for compare one field of two homes
function compareHome(homeA: Home, homeB: Home): number {
  const compare = parseInt(homeA.home, 10) - parseInt(homeB.home, 10);
  if (!compare) {
    return homeA.home.slice(-1).localeCompare(homeB.home.slice(-1));
  }
  return compare;
}

function compareStreet(homeA: Home, homeB: Home): number {
  return homeA.street.localeCompare(homeB.street);
}

function compareCity(homeA: Home, homeB: Home): number {
  return homeA.city.localeCompare(homeB.city);
}

function compareState(homeA: Home, homeB: Home): number {
  return homeA.state.localeCompare(homeB.state);
}

function comparePrice(homeA: Home, homeB: Home): number {
  return homeB.price - homeA.price;
}

// compare two homes using array of compare functions
function compareHomes(homeA: Home, homeB: Home, ...funcArray: ((a: any, b: any) => number)[]): number {
  if (!funcArray.length) {
    return;
  }
  let count = 0;
  let compare = funcArray[count](homeA, homeB);
  while (!compare && funcArray[count + 1] ) {
    compare = funcArray[++ count](homeA, homeB);
  }
  return compare;
}

type THomeSortFunction = {
  [key in THomesSortingMethod]: (home: Home[]) => Home[];
};

// create object of functions with fields as methods of sorting
function createSortFunc(): THomeSortFunction {
  return {
    STREET_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareStreet, compareCity, compareState, compareHome);
      });
    },
    STREET_DOWN: (homes: Home[]) => {
      return createSortFunc().STREET_UP(homes).reverse();
    },
    HOME_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareHome, compareStreet, compareCity, compareState);
      });
    },
    HOME_DOWN: (homes: Home[]) => {
      return createSortFunc().HOME_UP(homes).reverse();
    },
    CITY_UP: (homes: Home[]) => {
      return [...homes]
        .sort( (homeA, homeB) => {
          return compareHomes(homeA, homeB, compareCity, compareState, compareStreet, compareHome);
        });
    },
    CITY_DOWN: (homes: Home[]) => {
      return createSortFunc().CITY_UP(homes).reverse();
    },
    STATE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    STATE_DOWN: (homes: Home[]) => {
      return createSortFunc().STATE_UP(homes).reverse();
    },
    PRICE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, comparePrice, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    PRICE_DOWN: (homes: Home[]) => {
      return createSortFunc().PRICE_UP(homes).reverse();
    }
  };
}


