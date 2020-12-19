import { NgModule } from '@angular/core';
import { DeleteObjectsComponent } from './components/delete-objects/delete-objects.component';
import { BuyCreditsComponent } from './components/buy-credits/buy-credits.component';
import { MutualConnectionDialogComponent } from './components/mutual-connection-dialog/mutual-connection-dialog.component';
import { NoCreditsLeftComponent } from './components/no-credits-left/no-credits-left.component';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { CommonModule } from '@angular/common';
import { ExternalModule } from 'app/external-modules/external.module';
import { VacancyAppilyPopUpComponent } from './components/vacancy-appily-pop-up/vacancy-appily-pop-up.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { CommonCroppedDialogComponent } from './components/common-cropped-dialog/common-cropped-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ShareLinksDialogComponent } from './components/share-links-dialog/share-links-dialog.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { QRCodeModule } from 'angularx-qrcode';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';

@NgModule({
  declarations: [
    DeleteObjectsComponent,
    BuyCreditsComponent,
    MutualConnectionDialogComponent,
    NoCreditsLeftComponent,
    VacancyAppilyPopUpComponent,
    PaymentInfoComponent,
    CommonCroppedDialogComponent,
    ShareLinksDialogComponent,
    YoutubeVideoComponent,
  ],
  imports: [
    CommonModule,
    CustomPipesModule,
    ExternalModule,
    ImageCropperModule,
    DeviceDetectorModule.forRoot(),
    QRCodeModule

  ],
  exports: [
    CustomPipesModule,
    ExternalModule
  ],
  entryComponents: [
    BuyCreditsComponent,
    DeleteObjectsComponent,
    NoCreditsLeftComponent,
    MutualConnectionDialogComponent,
    VacancyAppilyPopUpComponent,
    PaymentInfoComponent,
    CommonCroppedDialogComponent,
    ShareLinksDialogComponent,
    YoutubeVideoComponent
  ]
})
export class SharedModule { }
