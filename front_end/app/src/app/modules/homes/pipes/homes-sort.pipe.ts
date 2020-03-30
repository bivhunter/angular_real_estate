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

function createSortFunc(): any {
  return {
    STREET_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        const compare = homeA.street.localeCompare(homeB.street);
        if (!compare) {
          const compare2 = parseInt(homeA.home, 10) - parseInt(homeB.home, 10);
          if (!compare2) {
            return homeA.home.slice(-1).localeCompare(homeB.home.slice(-1));
          }
          return compare2;
        }
        return compare;
      });
    },
    STREET_DOWN: (homes: Home[]) => {
      return createSortFunc().STREET_UP(homes).reverse();
    },
    HOME_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        const compare = parseInt(homeA.home, 10) - parseInt(homeB.home, 10);
        if (!compare) {
          const compare2 = homeA.home.slice(-1).localeCompare(homeB.home.slice(-1));
          if (!compare2) {
            return homeA.street.localeCompare(homeB.street);
          }
          return compare2;
        }
        return compare;
      });
    },
    HOME_DOWN: (homes: Home[]) => {
      return createSortFunc().HOME_UP(homes).reverse();
    },
    CITY_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeA.city.localeCompare(homeB.city);
      });
    },
    CITY_DOWN: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeB.city.localeCompare(homeA.city);
      });
    },
    STATE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeA.state.localeCompare(homeB.state);
      });
    },
    STATE_DOWN: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeB.state.localeCompare(homeA.state);
      });
    },
    PRICE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeB.price - homeA.price;
      });
    },
    PRICE_DOWN: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return homeA.price - homeB.price;
      });
    }
  };
}
