import { Deal } from 'src/app/modules/deal/model/deal';
import { TDealsSortingMethod, TDealsSortingField, THomesSortingField,
  THomesSortingMethod, TClientsSortingField, TClientsSortingMethod, ISortingConf } from 'src/app/modules/shared/types/types';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';

export function sortDeals(deals: Deal[], sortingConf: ISortingConf): Deal[] {
  if (!deals) {
    return null;
  }

  if (!deals.length) {
    return [];
  }

  let method = `${sortingConf.active}_${sortingConf.direction}`;
  if (!sortingConf.direction) {
    method = 'date_asc';
  }

  return createSortFunc()[method](deals);
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
    date_asc: (deals: Deal[]) => {
      return [...deals].sort( (dealA, dealB) => {
        return compareDeals(dealA, dealB, compareDate, comparePrice);
      });
    },
    date_desc: (deals: Deal[]) => {
      return createSortFunc().date_asc(deals).reverse();
    },
    price_asc: (deals: Deal[]) => {
      return [...deals].sort( (dealA, dealB) => {
        return compareDeals(dealA, dealB, comparePrice, compareDate);
      });
    },
    price_desc: (deals: Deal[]) => {
      return createSortFunc().price_asc(deals).reverse();
    }
  };
}


// ======================================================
// ================= homes sorting ======================

export function sortHomes(homes: Home[], sortingConf: ISortingConf): Home[] {
  if (!homes) {
    return null;
  }

  if (!homes.length) {
    return [];
  }

  let method = `${sortingConf.active}_${sortingConf.direction}`;
  if (!sortingConf.direction) {
    method = 'home_asc';
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
    street_asc: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareStreet, compareCity, compareState, compareHome);
      });
    },
    street_desc: (homes: Home[]) => {
      return createHomesSortFunc().street_asc(homes).reverse();
    },
    home_asc: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareHome, compareStreet, compareCity, compareState);
      });
    },
    home_desc: (homes: Home[]) => {
      return createHomesSortFunc().home_asc(homes).reverse();
    },
    city_asc: (homes: Home[]) => {
      return [...homes]
        .sort( (homeA, homeB) => {
          return compareHomes(homeA, homeB, compareCity, compareState, compareStreet, compareHome);
        });
    },
    city_desc: (homes: Home[]) => {
      return createHomesSortFunc().city_asc(homes).reverse();
    },
    state_asc: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    state_desc: (homes: Home[]) => {
      return createHomesSortFunc().state_asc(homes).reverse();
    },
    price_asc: (homes: Home[]) => {
      return [...homes].sort( (homeA, homeB) => {
        return compareHomes(homeA, homeB, compareHomePrice, compareState, compareCity,  compareStreet, compareHome);
      });
    },
    price_desc: (homes: Home[]) => {
      return createHomesSortFunc().price_asc(homes).reverse();
    }
  };
}


// ======================================================
// ================= clients sorting ======================

export function sortClients(clients: Client[], sortingConf: ISortingConf): Client[] {
  if (!clients) {
    return null;
  }
  if (!clients.length) {
    return [];
  }
  let method = `${sortingConf.active}_${sortingConf.direction}`;
  if (!sortingConf.direction) {
    method = 'surname_asc';
  }
  return createClientSortFunc()[method](clients);
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
function createClientSortFunc(): TClientSortingFunction {
  return {
    name_asc: (clients: Client[]) => {
      return [...clients].sort( (clientA, clientB) => {
        return compareClients(clientA, clientB, compareName, compareSurname);
      });
    },
    name_desc: (clients: Client[]) => {
      return createClientSortFunc().name_asc(clients).reverse();
    },
    surname_asc: (clients: Client[]) => {
      return [...clients].sort( (clientA, clientB) => {
        return compareClients(clientA, clientB, compareSurname, compareName);
      });
    },
    surname_desc: (clients: Client[]) => {
      return createClientSortFunc().surname_asc(clients).reverse();
    }
  };
}
