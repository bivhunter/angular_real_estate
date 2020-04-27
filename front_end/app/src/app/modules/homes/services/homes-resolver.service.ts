import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Home } from '../model/home';
import { Observable } from 'rxjs';
import { HomesService } from './homes.service';

@Injectable({
  providedIn: 'root'
})
export class HomesResolverService implements Resolve<Home[]> {

  constructor(
    private homesService: HomesService
  ) { }

  resolve(): Observable<Home[]> {
    return this.homesService.getHomes();
  }
}
