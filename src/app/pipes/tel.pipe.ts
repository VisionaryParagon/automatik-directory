import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tel'
})
export class TelPipe implements PipeTransform {

  transform(tel: string): string {
    if (tel.length === 10) {
      return tel.toString().trim().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2.$3');
    } else {
      return tel.toString().trim().replace(/(\d{2})(\d{4})(\d{6})/, '+$1 $2 $3');
    }
  }

}
