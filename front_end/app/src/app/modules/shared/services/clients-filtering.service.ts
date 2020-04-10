import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from '../../clients/model/client';

@Injectable({
  providedIn: 'root'
})

export class ClientsFilteringService {

  private changingFilterSubject: Subject<string> = new Subject();

  constructor() { }

  changeFilter(searchString: string): void {
    this.changingFilterSubject.next(searchString);
  }

  getChangingFilterEvent(): Observable<string> {
    return this.changingFilterSubject.asObservable();
  }

  filterPhone(phone: string): string {
    return filterPhone(phone);
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
        if (!match) {
          return false;
        }
      }
      return true;
    });
  }
}

function filterPhone(value: string): string {
  if (!value) {
    return '';
  }
  value = value.replace(/\s/g, '');
  value = value.replace(/[()+]/g, '');
  let resString = '+';

  for (let i = 0; i < value.length; i++) {
    if (i < 2) {
      resString = resString + value[i];
    }
    if (i === 2) {
      resString = resString + ' (' + value[i];
    }
    if (3 <= i  && i < 5) {
      resString = resString + value[i];
    }
    if (i === 5) {
      resString = resString  + ') ' + value[i];
    }
    if (6 <= i  && i < 8) {
      resString = resString + value[i];
    }
    if (i === 8) {
      resString = resString + ' ' + value[i];
    }
    if (8 < i  && i < 12) {
      resString = resString + value[i];
    }
    if (i >= 12) {
      break;
    }
  }
  return resString;
}
