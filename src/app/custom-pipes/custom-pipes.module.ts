import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from './pipes/item-name';
import { IndianCurrencyPipe, DecimalPricePipe, CustomPricePipe, PrecisionPrice } from './pipes/currency';
import { ProductNamePipe } from './pipes/productName';
import { SMENamePipe } from './pipes/sme-name';
import { SMEVacancyFilterName } from './pipes/sme-vacancy-filter-name';
import { SMEAddressPipe } from './pipes/sme-address';
import { DateAgoPipe } from './pipes/date-ago';
import { FeedBackMeesagePipe } from './pipes/feed-back-meesage.pipe';

export const PIPES = [
  NamePipe,
  IndianCurrencyPipe,
  DecimalPricePipe,
  ProductNamePipe,
  SMENamePipe,
  SMEVacancyFilterName,
  SMEAddressPipe,
  CustomPricePipe,
  PrecisionPrice,
  DateAgoPipe,
  FeedBackMeesagePipe
]

@NgModule({
  declarations: [
    PIPES,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    PIPES
  ]
})
export class CustomPipesModule { }
