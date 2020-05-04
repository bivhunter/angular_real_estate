import { Injectable } from '@angular/core';
import { TDealsSortingMethod, TDealsSortingField } from '../../shared/types/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class DealsSortingService {

  private sortingMethod: TDealsSortingMethod = 'DATE_UP';

  private changingDealsSortingMethodBehaviorSubject:
    BehaviorSubject<TDealsSortingMethod> = new BehaviorSubject(this.sortingMethod);

  constructor() { }

  getChangingDealsSortingMethodEvent(): Observable<TDealsSortingMethod> {
    return this.changingDealsSortingMethodBehaviorSubject.asObservable();
  }

  selectDealsSortingMethod(field: TDealsSortingField) {
    let newSortingMethod: TDealsSortingMethod;
    if (this.sortingMethod === `${field}_UP`) {
      newSortingMethod = `${field}_DOWN` as TDealsSortingMethod;
    } else {
      newSortingMethod = `${field}_UP` as TDealsSortingMethod;
    }
    this.setDealsSortingMethod(newSortingMethod);
  }

  sortDeals(deals: Deal[], method: TDealsSortingMethod): Deal[] {
    if (!deals.length) {
      return [];
    }
    return createSortFunc()[method](deals);
  }

  private setDealsSortingMethod(method: TDealsSortingMethod): void {
    this.sortingMethod = method;
    this.changingDealsSortingMethodBehaviorSubject.next(method);
  }
}

// compare two deals using array of compare functions
function compareDeals(dealA: Deal, dealB: Deal, ...funcArray: ((a: any, b: any) => number)[]): number {
  if (!funcArray.length) {
    return;
  }
  let count = 0;
  let compare = funcArray[count](dealA, dealB);
  while (!compare && funcArray[count + 1] ) {
    compare = funcArray[++ count](dealA, dealB);
  }
  return compare;
}

function compareDate(dealA: Deal, dealB: Deal): number {

  return Date.parse(dealA.date.toString()).valueOf() - Date.parse(dealB.date.toString()).valueOf();
}

function comparePrice(dealA: Deal, dealB: Deal): number {
  return dealB.price - dealA.price;
}

type TDealSortingFunction = {
  [key in TDealsSortingMethod]: (deals: Deal[]) => Deal[];
};

// create object of functions with fields as methods of sorting
function createSortFunc(): TDealSortingFunction {
  return {
    DATE_UP: (deals: Deal[]) => {
      return [...deals].sort( (dealA, dealB) => {
        return compareDeals(dealA, dealB, compareDate, comparePrice);
      });
    },
    DATE_DOWN: (deals: Deal[]) => {
      return createSortFunc().DATE_UP(deals).reverse();
    },
    PRICE_UP: (deals: Deal[]) => {
      return [...deals].sort( (dealA, dealB) => {
        return compareDeals(dealA, dealB, comparePrice, compareDate);
      });
    },
    PRICE_DOWN: (deals: Deal[]) => {
      return createSortFunc().PRICE_UP(deals).reverse();
    }
  };
}

