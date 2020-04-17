import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/modules/authorization/model/user';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentDate: Date = new Date();

  @ViewChild('birthday') birthdayInput: NgModel;
  @Input() user: User;

  @Output() submitEvent: EventEmitter<User> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
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
    this.submitEvent.emit(this.user);
  }

  onCancelButtonClick(): void {
    this.cancelEvent.emit();
  }
}
