import { Deal } from 'src/app/modules/deal/model/deal';
import { TDealsSortingMethod, TDealsSortingField, THomesSortingField, THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { Home } from 'src/app/modules/homes/model/home';

export function sortDeals(deals: Deal[], method: TDealsSortingMethod): Deal[] {
    if (!deals.length) {
      return [];
    }
    return createSortFunc()[method](deals);
  }

export function selectDealsSortingMethod(sortingMethod: TDealsSortingMethod, field: TDealsSortingField): TDealsSortingMethod {
    let newSortingMethod: TDealsSortingMethod;
    if (sortingMethod === `${field}_UP`) {
      newSortingMethod = `${field}_DOWN` as TDealsSortingMethod;
    } else {
      newSortingMethod = `${field}_UP` as TDealsSortingMethod;
    }
    return newSortingMethod;
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


// ======================================================
// ================= homes sorting ======================

export function selectHomesSortingMethod(sortingMethod: THomesSortingMethod, field: THomesSortingField): THomesSortingMethod {
  let newSortingMethod: THomesSortingMethod;
  if (sortingMethod === `${field}_UP`) {
    newSortingMethod = `${field}_DOWN` as THomesSortingMethod;
  } else {
    newSortingMethod = `${field}_UP` as THomesSortingMethod;
  }
  return newSortingMethod;
}

export function sortHomes(homes: Home[], method: THomesSortingMethod): Home[] {
  if (!homes.length) {
    return [];
  }
  return createHomesSortFunc()[method](homes);
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

function compareHomePrice(homeA: Home, homeB: Home): number {
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
function createHomesSortFunc(): THomeSortFunction {
  return {
    STREET_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareStreet, compareCity, compareState, compareHome);
      });
    },
    STREET_DOWN: (homes: Home[]) => {
      return createHomesSortFunc().STREET_UP(homes).reverse();
    },
    HOME_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareHome, compareStreet, compareCity, compareState);
      });
    },
    HOME_DOWN: (homes: Home[]) => {
      return createHomesSortFunc().HOME_UP(homes).reverse();
    },
    CITY_UP: (homes: Home[]) => {
      return [...homes]
        .sort( (homeA, homeB) => {
          return compareHomes(homeA, homeB, compareCity, compareState, compareStreet, compareHome);
        });
    },
    CITY_DOWN: (homes: Home[]) => {
      return createHomesSortFunc().CITY_UP(homes).reverse();
    },
    STATE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    STATE_DOWN: (homes: Home[]) => {
      return createHomesSortFunc().STATE_UP(homes).reverse();
    },
    PRICE_UP: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareHomePrice, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    PRICE_DOWN: (homes: Home[]) => {
      return createHomesSortFunc().PRICE_UP(homes).reverse();
    }
  };
}

