import { Pipe, PipeTransform } from '@angular/core';

interface PriorityMapping {
  [key: string]: string;
}
const priorityMapping: PriorityMapping = {
  'high': 'Alta',
  'low': 'Baja',
  'medium': 'Media',
};

@Pipe({
  name: 'priorityTransform',
  standalone: true
})
export class PriorityTransformPipe implements PipeTransform {

  transform(value: string): string {
    return priorityMapping[value] || value;
  }

}
