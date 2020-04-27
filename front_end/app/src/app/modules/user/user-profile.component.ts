import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/modules/user/model/user';
import { NgModel } from '@angular/forms';
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

  currentDate: Date = new Date();

  // popup question
  isPopupQuestion = false;
  title: string;
  text: string;
  private isSubmitQuestion: boolean;


  @ViewChild('birthday') birthdayInput: NgModel;
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
    if (Date.parse(date) > this.currentDate.valueOf()) {
      this.user.birthday = this.currentDate;
      const dateString = this.reformatDate(new Date().toDateString());
      this.birthdayInput.reset(dateString);
      return;
    }
    this.user.birthday = new Date (Date.parse(date));
  }

  reformatDate(dateStr: string): string {
    const date = new Date(Date.parse(dateStr));
    const dateString = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + (date.getDate() )).slice(-2);
    return dateString;
  }

  onRateChange(value: string): void {
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
    this.location.back();
  }

  private getUser(user: User): void {
    this.user = new User(user);
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
