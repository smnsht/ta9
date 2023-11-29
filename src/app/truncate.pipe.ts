import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, len: number): string {
    return value.length < (len-3) 
      ? value 
      : value.substring(0, len-3) + '...';
  }

}
