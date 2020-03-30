import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesViewService } from '../../services/homes-view.service';
import { Observable, Subscription } from 'rxjs';
import { TViewMode } from 'src/app/modules/shared/types/types';

@Component({
  selector: 'app-homes-list',
  templateUrl: './homes-list.component.html',
  styleUrls: ['./homes-list.component.css']
})
export class HomesListComponent implements OnInit, OnDestroy {

  @Input() homes: Home[];
  viewMode: TViewMode;

  viewModeBehaviorSubject: Observable<TViewMode>;
  viewModeSubscribtion: Subscription;

  constructor(
    private router: Router,
    private homesViewService: HomesViewService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
  }

  ngOnDestroy() {
    this.viewModeSubscribtion.unsubscribe();
  }

  onHomeProfileEvent(id: number | string): void {
    this.router.navigateByUrl('homes/details/' + id);
  }

  private initSubscribtion(): void {
    this.viewModeSubscribtion = this.homesViewService
    .getViewModeBehaviorSubject()
    .subscribe(
      (viewMode) => {
        console.log(viewMode);
        this.viewMode = viewMode;
      }
    );

  }

}
