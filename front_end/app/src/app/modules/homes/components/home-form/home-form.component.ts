import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { HomesService } from '../../../shared/services/homes.service';
import { Home } from '../../model/home';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { PopupService } from 'src/app/modules/shared/services/popup.service';
import { Location } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit, CanComponentDeactivate {

  isAddingMode: boolean;
  home: Home;
  title: string;
  currentDate = new Date();

  isFormDisabled = false;
  private isSubmit = false;
  private initHome: Home;

  @ViewChild('salesDate') dateInput: NgModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private homesService: HomesService,
    private popupService: PopupService
    ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.getHome();
  }

  async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
    if (this.isFormDisabled) {
      return true;
    }
    if (this.compareHomes()) {
      return true;
    }
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

  onDateChange(date: string) {
    if (Date.parse(date) > this.currentDate.valueOf()) {
      this.home.start_date = this.currentDate;
      const dateString = this.reformatDate(new Date().toDateString());
      this.dateInput.reset(dateString);
      return;
    }
    this.home.start_date = new Date (Date.parse(date));
  }

  reformatDate(dateStr: string): string {
    const date = new Date(Date.parse(dateStr));
    const dateString = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + (date.getDate() )).slice(-2);
    return dateString;
  }

  private compareHomes(): boolean {
    console.log(this.home, this.initHome);
    for (const prop in this.home) {
      if ((this.initHome[prop] === undefined) || (this.initHome[prop] !== this.home[prop])) {
        return false;
      }
    }
    return true;
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
    this.location.back();
  }

  private checkAddingMode() {
    const mode = this.route.snapshot.data.mode;
    return mode === 'Adding' ? true : false;
  }

  private onGetHome(home: Home): void {
    if (home.clientOwner) {
      this.isFormDisabled = true;
    }
    this.home = home;
    this.initHome = {...home};
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}

