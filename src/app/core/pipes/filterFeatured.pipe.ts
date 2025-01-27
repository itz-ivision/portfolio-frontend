import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../models';

@Pipe({
  name: 'filterFeatured'
})
export class FilterFeaturedPipe implements PipeTransform {
  transform(services: Service[]): Service[] {
    return services.filter(service => service.featured);
  }
}
