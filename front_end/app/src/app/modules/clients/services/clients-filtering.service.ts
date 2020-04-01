import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable()
export class ClientsFilteringService {

  private changingFilterSubject: Subject<string> = new Subject();

  constructor() { }

  changeFilter(searchString: string): void {
    this.changingFilterSubject.next(searchString);
  }

  getChangingFilterEvent(): Observable<string> {
    return this.changingFilterSubject.asObservable();
  }

  filterClients(clients: Client[], searchString: string): Client[] {
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
        console.log(word, searchWords, match);
        if (!match) {
          return false;
        }
      }
      return true;
    });
  }
}
