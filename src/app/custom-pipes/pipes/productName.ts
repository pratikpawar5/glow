import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: 'productNamePipe' })

//it is use to slice product name

export class ProductNamePipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if(value != null && value.length > 22){
            return value.slice(0,22) + '...'
        }
        return value
    }

}