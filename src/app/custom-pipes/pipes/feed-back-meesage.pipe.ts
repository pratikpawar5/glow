import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feedBackMsgPipe'
})
export class FeedBackMeesagePipe implements PipeTransform {

  transform(value: string, ...args: any[]) {

    if(value != null && value.length > 27){
        return value.slice(0,27) + '...'
    }
    return value
}


}
