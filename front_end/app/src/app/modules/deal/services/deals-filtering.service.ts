import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class DealsFilteringService {
  private changingFilterSubject: Subject<string> = new Subject();

  constructor() { }

  changeFilter(searchString: string): void {
    this.changingFilterSubject.next(searchString);
  }

  getChangingFilterEvent(): Observable<string> {
    return this.changingFilterSubject.asObservable();
  }

  filterDeals(deals: Deal[], searchString: string): Deal[] {
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
}
