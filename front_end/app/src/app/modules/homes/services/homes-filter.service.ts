import { Injectable } from '@angular/core';
import { Home } from '../model/home';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class HomesFilterService {

  private changingHomesFilterSubject: Subject<string> = new Subject();

  constructor() { }

  changeFilter(searchString: string): void {
    this.changingHomesFilterSubject.next(searchString);
  }

  getChangingFilterEvent(): Observable<string> {
    return this.changingHomesFilterSubject.asObservable();
  }

  filterHomes(homes: Home[], searchString: string): Home[] {
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
        console.log(word, searchWords, match);
        if (!match) {
          return false;
        }
      }
      return true;
    });
  }
}
