import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Home } from '../../../homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import { Store } from '@ngrx/store';
import { filterHomes } from 'src/app/store/functions/filtered-functions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPopupHomesSelectorConf } from '../../types/types';

@Component({
  selector: 'app-homes-list-selector',
  templateUrl: './homes-list-selector.component.html',
  styleUrls: ['./homes-list-selector.component.css']
})
export class HomesListSelectorComponent implements OnInit {

  displayedColumns: string[] = ['home', 'street', 'city', 'state', 'status'];

  client: Client = this.data.client;

  homes: Home[];
  filteredHomes: Home[];
  selectedHomeId: string | number;

  // for adding home
  isAdding = false;

  title: string;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<HomesListSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupHomesSelectorConf,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.getHomes();
  }

  filterHomes(searchString: string): void {
    this.filteredHomes = filterHomes(this.homes, searchString);
  }

  onClickHome(home: Home): void {
    if (this.isAdding) {
      this.selectedHomeId = home.id;
    } else {
      this.dialogRef.close();
      this.router.navigateByUrl(`homes/details/${home.id}`);
    }
  }

  private getHomes(): void {
    this.store.select(homesSelector.getHomes).subscribe(
      (homes) => {
        if (!homes) {
          this.homes = [];
          return;
        }

        switch (this.title) {
          case 'Add Viewed home': {
            this.isAdding = true;
            this.homes = this.getExistHomes(homes);
            break;
          }

          case 'Look Viewed home': {
            this.homes = this.client.homes || [];
            break;
          }

          case 'Look Bought homes': {
            this.homes = this.getBoughtHomes(homes);
            break;
          }
        }

        this.filterHomes('');
      }
    );
  }

  private getBoughtHomes(homes: Home[]): Home[] {
    return this.client.homes.filter(home => {
      return home.clientOwner && (home.clientOwner.id === this.client.id);
    });
  }

  private getExistHomes(homes: Home[]): Home[] {
    const newHomes =  homes.filter(home => {
      // cut sold out home
      if (home.clientOwner) {
        return false;
      }

      // cut already viewed homes
      for (const ownHome of this.client.homes) {
        if (ownHome.id === home.id) {
          return false;
        }
      }
      return true;
    });

    return newHomes;
  }

}
