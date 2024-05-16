import { Pipe, PipeTransform } from '@angular/core';

interface StatusMapping {
  [key: string]: string;
}
const statusMapping: StatusMapping = {
  'progress': 'En progreso',
  'finished': 'Finalizada',
  'empty': 'Vacío',
};

@Pipe({
  name: 'statusTransform',
  standalone: true
})
export class StatusTransformPipe implements PipeTransform {

  transform(value: string): string {
    return statusMapping[value] || value;
  }

}
