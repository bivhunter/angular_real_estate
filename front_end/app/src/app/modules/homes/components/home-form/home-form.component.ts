import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomesService } from '../../homes.service';
import { Home } from '../../model/home';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

  isAddingMode: boolean;
  home: Home;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homesService: HomesService
    ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.getHome();
  }

  onEditHome(): void {
    this.homesService.updateHome(this.home).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onAddHome(): void {
    this.homesService.addHome(this.home).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }


  onCancelButtonClick() {
    this.navigateBack();
  }

  onPriceChange(value: string): void {
    const newValue = value.split(',').join('');
    this.home.price = +newValue.slice(1);
  }

  private getHome(): void {
    if (this.isAddingMode) {
      this.onGetHome(new Home());
      this.title = 'Add Home';
    } else {
      const id = this.getId();
      this.title = `Home's details`;
      this.homesService.getHome(id).subscribe(
      (home) => this.onGetHome(home),
      (error) => console.log(error)
    );
    }
  }

  private navigateBack(): void {
    this.router.navigateByUrl('/homes');
  }

  private checkAddingMode() {
    const mode = this.route.snapshot.data.mode;
    return mode === 'Adding' ? true : false;
  }

  private onGetHome(home: Home): void {
    this.home = home;
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}

