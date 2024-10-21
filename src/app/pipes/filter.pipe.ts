import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], category?: number): any[] {
    return (category !== undefined && category !== null)
      ? array.filter((item) => item.category === category)
      : array;
  }
}
