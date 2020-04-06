import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Deal } from '../../deal/model/deal';

@Injectable({
  providedIn: 'root'
})
export class DealsFilteringServiceService {

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
      const allFields = [deal.client.name, deal.client.surname]
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
