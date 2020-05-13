import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Home } from '../../../homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';
import { filterHomes } from 'src/app/store/functions/filtered-functions';

@Component({
  selector: 'app-homes-list-selector',
  templateUrl: './homes-list-selector.component.html',
  styleUrls: ['./homes-list-selector.component.css']
})
export class HomesListSelectorComponent implements OnInit {

  @Input() client: Client;

  homes: Home[];
  filteredHomes: Home[];
  isDataReady = false;

  @Input() isAddingHomesView: boolean;
  @Input() isBoughtHomesView: boolean;

  isPopupQuestion = false;
  title: string;
  text: string;
  homeId: string | number;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.title = this.getTitle();
    this.getHomes();
  }

  filterHomes(searchString: string): void {
    this.filteredHomes = filterHomes(this.homes, searchString);
  }

  closeList(): void {
    this.closeEvent.emit('');
  }

  onClickHome(home: Home): void {
    if (this.isAddingHomesView) {
      this.openPopupQuestion(home, 'Add Home:');
    } else {
      this.router.navigateByUrl(`homes/details/${home.id}`);
    }
  }

  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.isAddingHomesView) {
      this.addHomeToClient();
    }
  }

  addHomeToClient(): void {
    this.store.dispatch(homesActions.addClientToHome({homeId: this.homeId, clientId: this.client.id}));
    this.closeList();
  }

  private getTitle(): string {
    if (this.isAddingHomesView) {
      return 'Select Viewed Home';
    }
    if (this.isBoughtHomesView) {
      return `Bought Home's List`;
    }
    return `Viewed Home's List`;
  }

  private openPopupQuestion(home: Home, title: string): void {
    this.homeId = home.id;
    this.title = title;
    this.text = `${home.home}, ${home.street}, ${home.city}, ${home.state}`;
    this.isPopupQuestion = true;
  }

  private getHomes(): void {
    this.store.select(homesSelector.getHomes).subscribe(
      (homes) => {
        if (!homes) {
          return;
        }

        this.isDataReady = true;
        if (this.isBoughtHomesView) {
          this.homes = this.client.homes.filter(home => {
          return home.clientOwner && (home.clientOwner.id === this.client.id);
          });
        } else {
          this.homes = this.isAddingHomesView ? this.cutOwnHomes(homes) : this.client.homes;
        }
        this.filterHomes('');
      }
    );
  }

  private cutOwnHomes(homes: Home[]): Home[] {
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
