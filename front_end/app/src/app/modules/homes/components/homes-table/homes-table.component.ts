import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { ISortingConf } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupQuestionComponent } from 'src/app/modules/shared/components/popup-question/popup-question.component';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit, AfterViewInit {

  homeForDelete: Home;
  currentHome: Home;

  @ViewChild(MatSort) matSort: MatSort;

  displayedColumns: string[] = ['home', 'street', 'city', 'state', 'price', 'status', 'actions'];

  isPopupListClients = false;
  isAdding: boolean;
  isPopup = false;
  @Input() homes: Home[];

  // for sorting
  sortingConf$: Observable<ISortingConf>;

  constructor(
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  ngAfterViewInit(): void {
    this.initSortingSubscription();
  }

  setSortingConf(sortingConf: ISortingConf) {
    this.store.dispatch(homesActions.setSortingConf({sortingConf}));
  }

  // show home details
  onDetailsButton(id: string | number): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  // show popup menu
 onDeleteButton(home: Home): void {
    const deleteDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Delete Home!',
        home
      }
    });
    deleteDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.deleteHome(home.id);
        }
      }
    );
  }


  deleteHome(id: string | number): void {
    this.store.dispatch(homesActions.deleteHome({id}));
    this.isPopup = false;
  }

  onAddClient(home: Home): void {
    this.currentHome = home;
    this.isAdding = true;
    this.isPopupListClients = true;
  }

  onViewedClient(home: Home): void {
    this.currentHome = home;
    this.isAdding = false;
    this.isPopupListClients = true;
  }

  private getFromStore(): void {
    this.sortingConf$ = this.store.select(homesSelector.getSortingConf);
  }

  private initSortingSubscription(): void {
    this.matSort.sortChange.subscribe(
      (event: ISortingConf) => {
        this.setSortingConf(event);
      }
    );
  }

}
