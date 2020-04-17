import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PopupService } from './../services/popup.service';


export interface CanComponentDeactivate {
  canDeactivate: (next: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})


export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private popupService: PopupService
  ) {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canDiactivate');
        return component.canDeactivate ? component.canDeactivate(nextState) : true;
        
        // return this.popupService.canDeactivate(nextState);
  }
}
