import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bday'
})
export class BdayPipe implements PipeTransform {

  transform(bday: string): string {
    bday.replace('1st', '1<sup>st</sup>');
    bday.replace('1th', '1<sup>th</sup>');
    bday.replace('2nd', '2<sup>nd</sup>');
    bday.replace('2th', '2<sup>th</sup>');
    bday.replace('3rd', '3<sup>rd</sup>');
    bday.replace('3th', '3<sup>th</sup>');
    bday.replace('4th', '4<sup>th</sup>');
    bday.replace('5th', '5<sup>th</sup>');
    bday.replace('6th', '6<sup>th</sup>');
    bday.replace('7th', '7<sup>th</sup>');
    bday.replace('8th', '8<sup>th</sup>');
    bday.replace('9th', '9<sup>th</sup>');
    bday.replace('0th', '0<sup>th</sup>');

    return bday;
  }

}
