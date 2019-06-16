import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bday'
})
export class BdayPipe implements PipeTransform {

  transform(bday: string): string {
    let date = bday;
    const sups = [
      '1st',
      '1th',
      '2nd',
      '2th',
      '3rd',
      '3th',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '0th'
    ];

    sups.forEach(s => {
      if (bday.indexOf(s) > -1) {
        const sup = s.replace(/(\d{1})(\D{2})/g, '$1' + '$2'.sup());
        date = bday.replace(s, sup);
        return date;
      }
    });

    return date;
  }

}
