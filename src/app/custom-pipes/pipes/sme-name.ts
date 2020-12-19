import { Pipe, PipeTransform } from "@angular/core";

//it use to slice the smename 

@Pipe({ name: 'smeNamePipe' })
export class SMENamePipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if(value != null && value.length >= 15){
            return value.slice(0,15) + '...'
        }
        return value
    }

}