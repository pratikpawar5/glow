import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'IndianCurrency' }) // THIS PIPE IS USE FOR CONVERT CURRENCY INTO INDIAN RUPEES AND FORMAT THE CURRENCY ACCORDING TO ,
export class IndianCurrencyPipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if (value != null) {
            return Number(value).
                toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0, minimumFractionDigits: 0 })
        }
    }
}
@Pipe({ name: 'DecimalPrice' }) // THIS PIPE IS USE FOR CONVERT CURRENCY INTO INDIAN RUPEES AND FORMAT THE CURRENCY ACCORDING TO ,
export class DecimalPricePipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if (value != null) {
            return Number(value).
                toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2, minimumFractionDigits: 0 })
        }

    }

}
@Pipe({ name: 'CustomPrice' })
export class CustomPricePipe implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if (value != null) {
            return Number(value).
                toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })
        }

    }

}
@Pipe({ name: 'PrecisionPrice' })
export class PrecisionPrice implements PipeTransform {

    transform(value: string, ...args: any[]) {

        if (value != null) {
            return Number(value).
                toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2, minimumFractionDigits: 2 })
        }

    }

}