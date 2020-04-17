import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { first, take, tap, map } from 'rxjs/operators';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class PopupService {

  private routeDeactivateSubject: Subject<boolean> = new Subject();
  isCanDeactivate = false;
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

//   async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
//     if (this.isCanDeactivate) {
//       return true;
//     }

//     // open popup

//     await this.router.navigate([{ outlets: {popup: 'popup'}}]);
    
//     this.routeDeactivateSubject
//       .pipe(
//         tap((checking) => {
//           console.log('tap', checking)
//           if (checking) {
//             //this.isCanDeactivate = true;
//             return this.router.navigate([{ outlets: {popup: null}}]).then(
//               () => this.router.navigateByUrl(next.url)
//             );

//           } else {
//            return this.router.navigate([{ outlets: {popup: null}}]);
//           }
//         })
//       ).subscribe();

//      return this.routeDeactivateSubject.asObservable().toPromise();
// }

}
