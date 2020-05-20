import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../user/model/user';
import { InitDataService } from './../../../shared/services/init-data.service';
import { FormGroup, FormControl, AbstractControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  isCorrectLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isCorrectLogin$: Observable<boolean> = this.isCorrectLoginSubject.asObservable();
  isCheckedRememberMe = true;

  loginForm: FormGroup;
  isHidePassword = true;

  constructor(
    private userService: UserService,
    private initDataService: InitDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initFormSubscription();
  }

  onSubmit(): void {
    // implemented remember me checkbox
    if (this.loginForm.controls.rememberMe.value) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.setItem('rememberMe', 'false');
    }

    const formValue = this.loginForm.value;
    this.user.email = formValue.email;
    this.user.password = formValue.password;
    
    this.userService.authorizeUser(this.user).subscribe(
      () => {
        this.initDataService.initData();
      },
      (error) => this.onSubmitError(error)
    );
  }

  onSubmitError(message: string) {
    if (message === 'Invalid login') {
      this.loginErrorChanged(false);
    }
  }

  private initFormSubscription(): void {
    this.loginForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
        console.log(this.loginForm.controls.email.errors, 'email')
        console.log(this.loginForm.controls.password.errors, 'password')
      }
    )

    this.loginForm.controls.email.valueChanges.subscribe(
      (value) => {
        this.loginErrorChanged(true);
      }
    );
    this.loginForm.controls.password.valueChanges.subscribe(
      (value) => {
        this.loginErrorChanged(true);
      }
    );
  }

  private loginErrorChanged(status: boolean): void {
    this.isCorrectLoginSubject.next(status);
    this.loginForm.controls.email.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    });
    this.loginForm.controls.password.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    });
  }

  private createForm(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ],
        [
          toggleValidator(this.isCorrectLogin$)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\S*$/),
          Validators.minLength(6)
        ],
        [
          toggleValidator(this.isCorrectLogin$)
        ]),
        rememberMe: new FormControl({
          checked: true
        })
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
