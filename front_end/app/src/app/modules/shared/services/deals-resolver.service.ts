import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Deal } from '../../deal/model/deal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealsResolverService implements Resolve<Deal[]> {

  constructor() { }

  resolve(): Observable<Deal[]> {
    return 
  }
}
