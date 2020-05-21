import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinDateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDateValidatorDirective, multi: true}]
})
export class MinDateValidatorDirective implements Validator {

  @Input('appMinDateValidator') maxAge: number;
  private currentDate = new Date();
  private validDate: Date;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    this.validDate = this.getValidDate();
    if (this.validDate.valueOf() < Date.parse(control.value) || !control.value) {
      return null;
    }
    return {minDateValidator: true};
  }

  private getValidDate(): Date {
    const nowYear = this.currentDate.getFullYear();
    const newDate = new Date();
    newDate.setFullYear(nowYear - this.maxAge);
    return newDate;
  }

}
