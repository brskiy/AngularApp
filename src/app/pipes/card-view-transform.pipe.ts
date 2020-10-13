import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardViewTransform'
})
export class CardViewTransformPipe implements PipeTransform {

  transform(value:string): string {
    return value.slice(0,4) +" XXXX XXXX "+ value.slice(12)
  }

}
