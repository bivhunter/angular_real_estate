import { Component, OnInit } from '@angular/core';
import { Home } from '../../model/home';
import { HomesService } from '../../homes.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {


  homes: Home[];

  

  constructor(
    private homesService: HomesService
  ) { }

  ngOnInit(): void {
    this.getHomes();
  }

  onHomeDeleteEvent(id: string | number): void {
    this.homesService.deleteHome(id).subscribe(
      () => this.getHomes(),
      (error) => console.log(error)
    );
  }

  private getHomes(): void {
    this.homesService.gethomes().subscribe(
      (homesList) => this.homes = [...homesList],
      (error) => console.log(error)
    );
  }

}
