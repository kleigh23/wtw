import { Pipe, PipeTransform } from '@angular/core';
import { Watching } from './watching.model';

@Pipe({
  name: 'watchingsFilter'
})
export class WatchingsFilterPipe implements PipeTransform {

  transform(watchings: Watching[], term: string): any {
    let filteredArray: Watching[] =[];
    for (let i = 0; i < watchings.length; i++) {
      let watching = watchings[i];
      if (watching.name.toLowerCase().includes(term)) {
        filteredArray.push(watching);
      }
    }
    if ( filteredArray.length < 1){
      return watchings;
    }
    return filteredArray;
  }

}
