import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { HomesService } from '../../../shared/services/homes.service';
import { Home } from '../../model/home';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { PopupService } from 'src/app/modules/shared/services/popup.service';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit, CanComponentDeactivate {

  isAddingMode: boolean;
  home: Home;
  title: string;

  isFormDisabled = false;
  isSubmit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homesService: HomesService,
    private popupService: PopupService
    ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.getHome();
  }

  async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
    if (this.isSubmit) {
      return true;
    }
    return this.popupService.canDeactivate(next);
  }

  onEditHome(): void {
    this.isSubmit = true;
    this.homesService.updateHome(this.home).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onAddHome(): void {
    this.isSubmit = true;
    this.homesService.addHome(this.home).subscribe(
      () => {
        this.navigateBack();
        },
      (error) => console.log(error)
    );
  }

  onCancelButtonClick() {
    this.navigateBack();
  }

  onPriceChange(value: string): void {
    const newValue = value.replace(/\s/g, '').replace(/\$/g, '');
    this.home.price = +newValue;
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
    console.log(home)
    if (home.clientOwner) {
      this.isFormDisabled = true;
    }
    this.home = home;
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}

