import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Home } from 'src/app/modules/homes/model/home';
import { HomesService } from 'src/app/modules/shared/services/homes.service';
import { HomesFilterService } from 'src/app/modules/shared/services/homes-filter.service';

@Component({
  selector: 'app-deals-homes-selector',
  templateUrl: './deals-homes-selector.component.html',
  styleUrls: ['./deals-homes-selector.component.css']
})
export class DealsHomesSelectorComponent implements OnInit {

  homes: Home[] = [];
  filteredHomes: Home[] = [];
  @Input() selectedHome: Home;

  @Output() submitEvent: EventEmitter<Home> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output() backEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private homesService: HomesService,
    private homeFilteringService: HomesFilterService
  ) { }

  ngOnInit(): void {
    this.getHomes();
  }

  filterHomes(searchString: string) {
    this.filteredHomes = this.homeFilteringService.filterHomes(this.homes, searchString);
  }

  private getHomes(): void {
    this.homesService.getHomes().subscribe(
      (homes) => this.getHomesHandler(homes)
    );
  }

  private getHomesHandler(homes: Home[]): void {
    this.homes = homes;
    this.filterHomes('');
  }

}
