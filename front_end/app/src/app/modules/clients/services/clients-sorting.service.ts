import { Injectable } from '@angular/core';
import { TClientsSortingMethod, TClientsSortingField } from '../../shared/types/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable()
export class ClientsSortingService {

  private sortingMethod: TClientsSortingMethod = 'SURNAME_UP';

  private changingSortingMethodBehaviorSubject:
    BehaviorSubject<TClientsSortingMethod> = new BehaviorSubject(this.sortingMethod);

  constructor() { }

  getChangingSortingMethodEvent(): Observable<TClientsSortingMethod> {
    return this.changingSortingMethodBehaviorSubject.asObservable();
  }

  selectClientsSortingMethod(field: TClientsSortingField) {
    let newSortingMethod: TClientsSortingMethod;
    if (this.sortingMethod === `${field}_UP`) {
      newSortingMethod = `${field}_DOWN` as TClientsSortingMethod;
    } else {
      newSortingMethod = `${field}_UP` as TClientsSortingMethod;
    }
    this.setClientsSortingMethod(newSortingMethod);
  }

  sortClients(clients: Client[], method: TClientsSortingMethod): Client[] {
    if (!clients.length) {
      return [];
    }
    return createSortFunc()[method](clients);
  }

  private setClientsSortingMethod(method: TClientsSortingMethod): void {
    this.sortingMethod = method;
    this.changingSortingMethodBehaviorSubject.next(method);
  }
}


// functions for compare one field of two clients
function compareName(clientA: Client, clientB: Client): number {
  return clientA.name.localeCompare(clientB.name);
}

function compareSurname(clientA: Client, clientB: Client): number {
  return clientA.surname.localeCompare(clientB.surname);
}

// compare two clients using array of compare functions
function compareClients(clientA: Client, clientB: Client, ...funcArray: ((a: any, b: any) => number)[]): number {
  if (!funcArray.length) {
    return;
  }
  let count = 0;
  let compare = funcArray[count](clientA, clientB);
  while (!compare && funcArray[count + 1] ) {
    compare = funcArray[++ count](clientA, clientB);
  }
  return compare;
}

type TClientSortingFunction = {
  [key in TClientsSortingMethod]: (client: Client[]) => Client[];
};

// create object of functions with fields as methods of sorting
function createSortFunc(): TClientSortingFunction {
  return {
    NAME_UP: (clients: Client[]) => {
      return [...clients].sort( (clientA, clientB) => {
        return compareClients(clientA, clientB, compareName, compareSurname);
      });
    },
    NAME_DOWN: (clients: Client[]) => {
      return createSortFunc().NAME_UP(clients).reverse();
    },
    SURNAME_UP: (clients: Client[]) => {
      return [...clients].sort( (clientA, clientB) => {
        return compareClients(clientA, clientB, compareSurname, compareName);
      });
    },
    SURNAME_DOWN: (clients: Client[]) => {
      return createSortFunc().SURNAME_UP(clients).reverse();
    }
  };
}

