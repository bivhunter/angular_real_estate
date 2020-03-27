import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client';

@Pipe({
  name: 'clientsFilter'
})
export class ClientsFilterPipe implements PipeTransform {

  transform(clients: Client[], searchString: string): Client[] {
    if (!searchString) {
      return clients;
    }
    if (clients && clients.length) {
      const newClients = clients.filter((client) => {
        return client.name.toLowerCase().includes(searchString.toLowerCase()) ||
        client.surname.toLowerCase().includes(searchString.toLowerCase());
      });
      return newClients;
    } else {
      return [];
    }
  }

}
