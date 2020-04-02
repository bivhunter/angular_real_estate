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
        console.log(word, searchWords, match);
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
  value = value.replace(/[()]/g, '');
  let resString = '+';

  for (let i = 1; i < value.length; i++) {
    if (i < 3) {
      resString = resString + value[i];
    }
    if (i === 3) {
      resString = resString + ' (' + value[i];
    }
    if (4 <= i  && i < 6) {
      resString = resString + value[i];
    }
    if (i === 6) {
      resString = resString  + ') ' + value[i];
    }
    if (7 <= i  && i < 9) {
      resString = resString + value[i];
    }
    if (i === 9) {
      resString = resString + ' ' + value[i];
    }
    if (9 < i  && i < 13) {
      resString = resString + value[i];
    }
    if (i >= 13) {
      break;
    }
  }
  return resString;
}