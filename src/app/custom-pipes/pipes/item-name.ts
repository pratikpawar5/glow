import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'namePipe' })
//it is used to slice the name
export class NamePipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if(value != null && value.length > 19){
            return value.slice(0,18) + '..'
        }
        return value
    }

}