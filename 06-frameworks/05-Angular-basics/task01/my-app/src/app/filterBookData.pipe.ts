import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'filterBookDescription'})

export class FilterBookDescriptionPipe implements PipeTransform {
  transform(text: string): string {
    return text ? text.slice(0, 200) + '...' : ''
  }
}
