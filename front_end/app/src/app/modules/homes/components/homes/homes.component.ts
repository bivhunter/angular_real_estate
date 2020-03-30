import { Component, OnInit, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { HomesService } from '../../homes.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit, OnDestroy {


  homes: Home[] = [];

  updateHomesListEvent: Observable<any>;
  updateHomesListEventSubscribtion: Subscription;


  constructor(
    private homesService: HomesService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
    this.getHomes();
  }

  ngOnDestroy(): void {
    this.updateHomesListEventSubscribtion.unsubscribe();
  }

  private getHomes(): void {
    this.homesService.gethomes().subscribe(
      (homesList) => this.homes = [...homesList],
      (error) => console.log(error)
    );
  }

  private initSubscribtion(): void {
    this.updateHomesListEvent = this.homesService.getHomesListChangesEvent();
    this.updateHomesListEventSubscribtion = this.updateHomesListEvent
      .subscribe(() => this.getHomes());
  }

}
