import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


export interface CanComponentDeactivate {
  canDeactivate: (next: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})


export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor() {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        const res = component.canDeactivate ? component.canDeactivate(nextState) : true;
        return res;
  }
}
