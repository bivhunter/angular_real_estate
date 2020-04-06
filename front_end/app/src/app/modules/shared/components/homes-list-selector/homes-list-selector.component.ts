import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Home } from '../../../homes/model/home';
import { HomesService } from '../../services/homes.service';
import { HomesFilterService } from '../../services/homes-filter.service';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from './../../services/clients.service';
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

  @Input('adding') isAddingMode: boolean;
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
    this.getHomes();
  }

  filterHomes(searchString: string): void {
    this.filteredHomes = this.homesFilterService.filterHomes(this.homes, searchString);
  }

  closeList(): void {
    this.closeEvent.emit('');
  }

  onClickHome(home: Home): void {
    if (this.isAddingMode) {
      this.openPopupQuestion(home, 'Add Home:');
    } else {
      this.router.navigateByUrl(`homes/details/${home.id}`);
    }
  }

  onClickDelete(home: Home) {
    this.openPopupQuestion(home, 'Remove Home:');
  }

  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.isAddingMode) {
      this.addHomeToClient();
    } else {
      this.deleteHomeFromClient();
    }
  }

  addHomeToClient(): void {
    this.clientService.addHomeToClient(this.homeId, this.client.id)
      .subscribe(
        () => this.closeList()
      );
  }

  deleteHomeFromClient(): void {
    this.clientService.deleteHomeFromClient(this.homeId, this.client.id)
      .subscribe(
        () => this.closeList()
      );
  }


  private openPopupQuestion(home: Home, title: string): void {
    this.homeId = home.id;
    this.title = title;
    this.text = `${home.home}, ${home.street}, ${home.city}, ${home.state}`;
    this.isPopupQuestion = true;
  }

  private getHomes(): void {
    this.homesService.gethomes().subscribe(
      (homes) => {
        this.homes = this.isAddingMode ? this.cutOwnHomes(homes) : this.client.homes;
        this.filterHomes('');
      }
    );
  }

  private cutOwnHomes(homes: Home[]): Home[] {
    return homes.filter(home => {
      for (const ownHome of this.client.homes) {
        if (ownHome.id === home.id) {
          return false;
        }
      }
      return true;
    });
  }

}
