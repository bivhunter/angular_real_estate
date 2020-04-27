import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Home } from '../model/home';
import { Observable } from 'rxjs';
import { HomesService } from './homes.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDetailsResolverService implements Resolve<Home> {

  constructor(
    private homesService: HomesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Home> {
    const id = route.paramMap.get('id');
    return this.homesService.getHome(id);
  }
}
