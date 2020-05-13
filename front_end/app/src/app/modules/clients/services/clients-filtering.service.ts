import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ClientsFilteringService {

  constructor() { }

  filterPhone(phone: string): string {
    return filterPhone(phone);
  }
}

// change phone format
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
