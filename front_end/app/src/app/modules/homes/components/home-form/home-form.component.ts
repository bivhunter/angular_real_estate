import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { HomesService } from '../../services/homes.service';
import { Home } from '../../model/home';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { PopupService } from 'src/app/modules/shared/services/popup.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit, CanComponentDeactivate {

  private initHome: Home;
  home: Home;

  isAddingMode: boolean;
  title: string;

  isFormDisabled = false;


  // popup
  isPopupQuestion = false;
  popupTitle: string;
  text: string;

  // for canDiactivate
  isCanDeactivatePopup = false;
  private isSubmit = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private homesService: HomesService,
    private popupService: PopupService
    ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.route.data.subscribe(
      data => {
        this.isAddingMode = data.mode === 'Adding';
        this.getHome(data.home);
      }
    );
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit || this.compareHomes() ) {
      return of(true);
    }
    this.isCanDeactivatePopup = true;

    return this.popupService.canDeactivate(next).pipe(
      tap((checking) => {
          this.isCanDeactivatePopup = false;
      })
    );
  }

  // buttons click handler
  onEditHome(): void {
    if (this.compareHomes()) {
      this.navigateBack();
    } else {
    this.popupTitle = 'Save changes!';
    this.openPopupQuestion();
  }
}

  onAddHome(): void {
    this.popupTitle = 'Add home!';
    this.openPopupQuestion();
  }

  onCancelButtonClick() {
    if (this.compareHomes()) {
      this.isSubmit = true;
      this.navigateBack();
    } else {
      this.popupTitle = 'Cancel changes!';
      this.openPopupQuestion();
    }
  }

  // popup question events
  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.popupTitle === 'Cancel changes!') {
      this.isSubmit = true;
      this.navigateBack();
    } else if (this.popupTitle === 'Add home!') {
      this.addHome();
    } else {
      this.updateHome();
    }
  }

  onPriceChange(value: string): void {
    const newValue = value.replace(/\s/g, '').replace(/\$/g, '');
    this.home.price = +newValue;
  }

  onDateChange(date: string) {
    const newDate = date.slice(-10);
    if (!date) {
      return;
    }
    this.home.start_date = new Date(Date.parse(newDate));
  }

  private openPopupQuestion(): void {
    this.isPopupQuestion = true;
  }

  private compareHomes(): boolean {
    for (const prop in this.home) {
      if ((this.initHome[prop] === undefined) || (this.initHome[prop] !== this.home[prop])) {
        return false;
      }
    }
    return true;
  }

  private updateHome(): void {
    this.homesService.updateHome(this.home).subscribe(
      () => {
        this.isSubmit = true;
        this.navigateBack();
      },
      (error) => console.log(error)
    );
  }

  private addHome(): void {
    this.homesService.addHome(this.home).subscribe(
      () => {
        this.isSubmit = true;
        this.navigateBack();
      },
      (error) => console.log(error)
    );
  }

  private getHome(home: Home): void {
    if (this.isAddingMode) {
      this.onGetHome(new Home());
      this.title = 'Add Home';
    } else {
      this.title = `Home's details`;
      this.onGetHome(home);
    }
  }

  private navigateBack(): void {
    this.isPopupQuestion = false;
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

}

