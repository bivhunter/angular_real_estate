import { Deal } from 'src/app/modules/deal/model/deal';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';

export function filterDeals(deals: Deal[], searchString: string): Deal[] {
    if (!deals.length) {
      return [];
    }

    if (!searchString) {
      return deals;
    }

    return deals.filter( (deal: Deal) => {
      let allFieldsArr = [
        deal.home.home,
        deal.home.street,
        deal.home.city,
        deal.home.state,
        deal.home.price
      ];

      if (deal.client) {
        allFieldsArr = [...allFieldsArr, deal.client.name, deal.client.surname];
      }

      const allFields = allFieldsArr.map(word => word.toString()).join(' ');

      const searchWords =  searchString.trim().split(' ');
      for (const word of searchWords) {
        const match =  allFields.match(new RegExp(`\\b${word}`, 'i'));
        if (!match) {
          return false;
        }
      }
      return true;
    });
  }


// ======================================================
// ================= homes filtering ======================


export function filterHomes(homes: Home[], searchString: string): Home[] {
  if (!homes.length) {
    return [];
  }
  if (!searchString) {
    return homes;
  }
  return homes.filter( (home: Home) => {
    const allFields = [home.home, home.street, home.city, home.state, home.price]
      .map(word => word.toString())
      .join(' ');
    const searchWords =  searchString.trim().split(' ');
    for (const word of searchWords) {
      const match =  allFields.match(new RegExp(`\\b${word}`, 'i'));
      if (!match) {
        return false;
      }
    }
    return true;
  });
}

// ======================================================
// ================= clients filtering ======================

export function filterClients(clients: Client[], searchString: string): Client[] {
  if (!clients.length) {
    return [];
  }

  if (!searchString) {
    return clients;
  }

  return clients.filter( (client: Client) => {
    const allFields = [client.name, client.surname]
      .map(word => word.toString())
      .join(' ');
    const searchWords =  searchString.trim().split(' ');
    for (const word of searchWords) {
      const match =  allFields.match(new RegExp(`\\b${word}`, 'i'));
      if (!match) {
        return false;
      }
    }
    return true;
  });
}
