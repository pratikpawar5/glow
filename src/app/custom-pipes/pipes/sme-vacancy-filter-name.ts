import { Pipe, PipeTransform } from "@angular/core";

//it use to slice the vacancy filter 

@Pipe({ name: 'smeVacancyFilterName' })
export class SMEVacancyFilterName implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if(value != null && value.length >= 20){
            return value.slice(0,20) + '...'
        }
        return value
    }

}