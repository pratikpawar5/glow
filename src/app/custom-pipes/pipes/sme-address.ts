import { Pipe, PipeTransform } from "@angular/core";
//it use to slice the smeaddress 
@Pipe({ name: 'smeAddressPipe' })
export class SMEAddressPipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if (value != null && value.length >= 9) {
            return value.slice(0, 9) + '...'
        }
        return value
    }

}