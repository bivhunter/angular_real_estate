import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Home } from '../../../homes/model/home';
import { HomesService } from '../../../homes/services/homes.service';
import { HomesFilterService } from '../../../homes/services/homes-filter.service';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from '../../../clients/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes-list-selector',
  templateUrl: './homes-list-selector.component.html',
  styleUrls: ['./homes-list-selector.component.css']
})
export class HomesListSelectorComponent implements OnInit {

  @Input() client: Client;

  homes: Home[];
  filteredHomes: Home[];

  @Input() isAddingHomesView: boolean;
  @Input() isBoughtHomesView: boolean;

  isPopupQuestion = false;
  title: string;
  text: string;
  homeId: string | number;


  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private homesService: HomesService,
    private homesFilterService: HomesFilterService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title = this.getTitle();
    this.getHomes();
  }

  filterHomes(searchString: string): void {
    this.filteredHomes = this.homesFilterService.filterHomes(this.homes, searchString);
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
    this.clientService.addHomeToClient(this.homeId, this.client.id)
      .subscribe(
        () => this.closeList()
      );
  }

  // deleteHomeFromClient(): void {
  //   this.clientService.deleteHomeFromClient(this.homeId, this.client.id)
  //     .subscribe(
  //       () => this.closeList()
  //     );
  // }

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
    this.homesService.getHomes().subscribe(
      (homes) => {
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

    console.log('new Homes: ', newHomes);
    return newHomes;
  }

}
