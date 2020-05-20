import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxDateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxDateValidatorDirective, multi: true}]
})
export class MaxDateValidatorDirective implements Validator {

  @Input('appMaxDateValidator') minAge: number;
  private currentDate = new Date();
  private validDate: Date;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    this.validDate = this.getValidDate();
    if (this.validDate.valueOf() > Date.parse(control.value)) {
      return null;
    }
    return {BirthdayValidator: 'bigDate'};
  }

  private getValidDate(): Date {
    const nowYear = this.currentDate.getFullYear();
    const newDate = new Date();
    newDate.setFullYear(nowYear - this.minAge);
    return newDate;
  }

}
