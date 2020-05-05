import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user/model/user';
import { UserService } from './services/user.service';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate.guard';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { PopupService } from './../shared/services/popup.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, CanComponentDeactivate {

  // popup question
  isPopupQuestion = false;
  title: string;
  text: string;
  private isSubmitQuestion: boolean;

  user: User;
  private initUser: User;

  // for canDiactivate
  private isSubmit = false;
  isCanDeactivatePopup = false;

  constructor(
    private userService: UserService,
    private popupService: PopupService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => this.getUser(data.user)
    );
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.compareUser() || this.isSubmit) {
      return of(true);
    }
    this.isCanDeactivatePopup = true;

    return this.popupService.canDeactivate(next).pipe(
      tap((checking) => {
          this.isCanDeactivatePopup = false;
      })
    );
  }

  onBirthdayChange(date: string) {
    const newDate = date.slice(-10);
    if (!date) {
      return;
    }
    this.user.birthday = new Date (Date.parse(newDate));
  }

  onRateChange(value: string): void {
    console.log(value)
    const newValue = value.replace(/\s/g, '').replace(/\$/g, '');
    this.user.rate = +newValue;
  }

  onEditUser() {
    if (this.compareUser()) {
      this.goBack();
    } else {
    this.isSubmitQuestion = true;
    this.openPopupQuestion('Save changes!');
    }
  }

  onCancelButtonClick(): void {
    if (this.compareUser()) {
      this.goBack();
    } else {
      this.isSubmitQuestion = false;
      this.openPopupQuestion('Cancel changes!');
    }
  }

  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.isSubmitQuestion) {
      this.userService.updateUser(this.user).subscribe(
        user => {
          this.isSubmit = true;
          this.goBack();
        }
      );
    } else {
      this.isSubmit = true;
      this.goBack();
    }
  }

  private goBack(): void {
    this.isPopupQuestion = false;
    this.location.back();
  }

  private getUser(user: User): void {
    this.user = user;
    this.initUser = {...this.user} as User;
  }

  private compareUser(): boolean {
    for (const prop in this.user) {
      if ((this.initUser[prop] === undefined) || (this.initUser[prop] !== this.user[prop])) {
        return false;
      }
    }
    return true;
  }

  private openPopupQuestion(title: string): void {
    this.title = title;
    this.isPopupQuestion = true;
  }
}
