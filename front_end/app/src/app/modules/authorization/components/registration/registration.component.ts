import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/model/user';
import { UserService } from 'src/app/modules/user/services/user.service';
import { FormControl, Validators, FormGroup, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  isAcceptedTerms = false;

  private isUniqueEmail$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // form
  registrationForm: FormGroup;

  // change password view
  isHidePassword = true;

  // change view after registration
  registration = {
    text: 'If you already registered',
    status: false
  };

  private currencyPipe: CurrencyPipe = new CurrencyPipe('fr');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
    this.initFormSubscription();
  }

  onSubmit(): void {
    const fV = this.registrationForm.value;
    this.user = Object.assign(this.user, fV);
    this.user.rate = this.onRateChange(fV.rate);

    this.userService.registerUser(this.user).subscribe(
      (newUser) => {
        this.registration.text = 'Your registration is successfull';
        this.registration.status = true;
    },
      (error) => this.onSubmitError(error)
    );
  }

  onRateChange(value: string): string {
    const newValue = value.replace(/\s/g, '').replace(/\$/g, '');
    return newValue;
  }

  onSubmitError(message: string) {
    if (message === 'email must be unique')  {
      this.isUniqueEmail$.next(false);
      this.registrationForm.controls.email.updateValueAndValidity();
    }
  }

  private initFormSubscription(): void {
    this.registrationForm.controls.email.valueChanges.subscribe(
      () => this.isUniqueEmail$.next(true)
    );

    this.registrationForm.controls.rate.valueChanges
      .pipe(
        map(rate => this.onRateChange(rate))
      )
      .subscribe(
      value => {
        this.registrationForm.controls.rate
          .setValue(this.currencyPipe.transform(value, 'CAD', 'symbol-narrow', '1.0-0'), {emitEvent: false});
      }
    );
  }

  private createForm(): void {
    this.registrationForm = new FormGroup(
      {
        fullname: new FormControl(this.user.fullname, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+\s[A-Za-z]+$/),
          Validators.maxLength(30),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ],
        [
          toggleValidator(this.isUniqueEmail$.asObservable())
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\S*$/),
          Validators.minLength(6)
        ]),
        rate: new FormControl('', [
          Validators.required,
          Validators.pattern(/[0-9,\s]*[$]{1}/g)
        ]),
        terms: new FormControl('', [Validators.required])
      }
    );

  }
}

function toggleValidator(check$: Observable<boolean>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
    return check$.pipe(
      take(1),
      map(check => check ? null : {toggleValidator: true})
    );
  };
}
