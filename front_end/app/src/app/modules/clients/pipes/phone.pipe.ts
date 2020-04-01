import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString, parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    console.log(value);
    value = value.replace(/\s/g, '');
    console.log(value);
    value = value.replace(/[()]/g, '');
    console.log(value);
    let resString = '+';

    for (let i = 1; i < value.length; i++) {
      if (i < 3) {
        resString = resString + value[i];
      }
      if (i === 3) {
        resString = resString + ' (' + value[i];
      }
      if (4 <= i  && i < 6) {
        resString = resString + value[i];
      }
      if (i === 6) {
        resString = resString  + ') ' + value[i];
      }
      if (7 <= i  && i < 9) {
        resString = resString + value[i];
      }
      if (i === 9) {
        resString = resString + ' ' + value[i];
      }
      if (9 < i  && i < 13) {
        resString = resString + value[i];
      }
      if (i >= 13) {
        break;
      }
    }
    console.log('res', resString);
    return resString;
  }

}
