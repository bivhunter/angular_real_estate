import { Directive, Input } from '@angular/core';
import { Validators, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appToogleValidatore]',
  providers: [{provide: NG_VALIDATORS, useExisting: ToogleValidatoreDirective, multi: true}]
})
export class ToogleValidatoreDirective implements Validators {
  @Input('appToogleValidatore') param: boolean;
  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    console.log('validator', this.param)
    if (this.param) {
      return null;
    }
    return {ToggleValidator: 'false'};
  }
}
