import { Pipe, PipeTransform } from '@angular/core';
import { Home } from '../model/home';
import { THomesSortingMethod } from '../../shared/types/types';

@Pipe({
  name: 'homesSort'
})
export class HomesSortPipe implements PipeTransform {

  transform(homes: Home[], method: THomesSortingMethod): Home[] {
    if (!homes.length) {
      return [];
    }
    return createSortFunc()[method](homes);
  }

}

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

function createSortFunc(): any {
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
