import { Injectable } from '@angular/core';
import { Subject, Observable, of, from } from 'rxjs';
import { first, take, tap, map, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class PopupService {

  private routeDeactivateSubject: Subject<boolean> = new Subject();
  private isCanDeactivate = false;
  constructor(
    private router: Router
  ) { }

  getRouteDeactivateEvent(): Observable<boolean> {
    console.log('getRouteDeactivateEvent')
    return this.routeDeactivateSubject.asObservable();
  }

  submitRouteDeactivate(): void {
    console.log('submitRouteDeactivate')
    this.routeDeactivateSubject.next(true);
  }

  cancelRouteDiactivate(): void {
    this.routeDeactivateSubject.next(false);
  }

  restartCanDeactivate(): void {
    this.isCanDeactivate = false;
  }

  async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
    if (this.isCanDeactivate) {
      this.isCanDeactivate = false;
      return true;
    }

    // open popup
    await this.router.navigate([{ outlets: {popup: 'popup'}}]);

    return this.routeDeactivateSubject.pipe(
      switchMap(async (checking) => {
        if (checking) {
          this.isCanDeactivate = true;
          return await this.router.navigateByUrl(next.url);
        } else {
         return this.router.navigate([{ outlets: {popup: null}}]);
        }
      })
    ).toPromise();
}

}
