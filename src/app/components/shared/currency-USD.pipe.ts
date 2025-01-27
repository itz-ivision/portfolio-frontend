import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyUSD',
  standalone: true
})
export class CurrencyUSDPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
}