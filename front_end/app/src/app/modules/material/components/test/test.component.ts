import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  pipe: CurrencyPipe = new CurrencyPipe('fr');
  isHidePassword = true;
  rate = 100;

  fullnameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+/g),
    Validators.maxLength(30)
  ]);

  emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/\w[A-Za-z0-9_]*[@]\w\S+$/)
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  rateControl = new FormControl('0', [
    Validators.required,
    Validators.pattern(/[0-9,\s]*[$]{1}/g)
  ]);

  registrationFormGroup = new FormGroup(
    {
      fullname: this.fullnameControl,
      email: this.emailControl,
      password: this.passwordControl,
      rate: this.rateControl
    }
  )

  constructor() { }

  ngOnInit(): void {
    this.fullnameControl.valueChanges.subscribe(
      (value) => console.log(value),
    );

    this.fullnameControl.statusChanges.subscribe(
      (value) => console.log(this.fullnameControl.errors),
    );

    this.rateControl.valueChanges.subscribe(
      value => this.rateControl.setValue(this.pipe.transform(value, 'CAD', 'symbol-narrow', '1.0-0'))
    )
    
  }

}
