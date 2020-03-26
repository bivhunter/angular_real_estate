import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString, parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    const phoneNumber = parsePhoneNumberFromString(value);

    if (phoneNumber) {
      return phoneNumber.format('INTERNATIONAL');
    }
    return '';
  }

}
