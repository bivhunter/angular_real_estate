import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client';

@Pipe({
  name: 'clientsSort'
})
export class ClientsSortPipe implements PipeTransform {

  transform(clients: Client[], method: string): Client[] {
    if (!clients) {
      return clients;
    }

    if (method === 'name_up') {
      return [...clients].sort((a: Client, b: Client) => {
        const compare = a.name.localeCompare(b.name);
        if (!compare) {
          return a.surname.localeCompare(b.surname);
        }
        return compare;
      });
    }

    if (method === 'name_down') {
      return [...clients].sort((a: Client, b: Client) => {
        const compare = b.name.localeCompare(a.name);
        if (!compare) {
          return b.surname.localeCompare(a.surname);
        }
        return compare;
      });
    }

    if (method === 'surname_up') {
      return [...clients].sort((a: Client, b: Client) => {
        const compare = a.surname.localeCompare(b.surname);
        if (!compare) {
          return a.name.localeCompare(b.name);
        }
        return compare;
      });
    }

    if (method === 'surname_down') {
      return [...clients].sort((a: Client, b: Client) => {
        const compare = b.surname.localeCompare(a.surname);
        if (!compare) {
          return b.name.localeCompare(a.name);
        }
        return compare;
      });
    }

    return clients;
  }
}
