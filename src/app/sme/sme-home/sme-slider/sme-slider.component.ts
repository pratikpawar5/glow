import { Component, OnInit, Input } from '@angular/core';
import { PopUpSliderComponent } from './pop-up-slider/pop-up-slider.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { SMEImage } from '@models/sme-image';

@Component({
  selector: 'app-sme-slider',
  templateUrl: './sme-slider.component.html',
  styleUrls: ['./sme-slider.component.css']
})
export class SmeSliderComponent implements OnInit {

  @Input()
  sliderImages:Array<SMEImage>
  uploadDialogRef: MatDialogRef<PopUpSliderComponent>;
  contentServer: string = environment.CONTENT_SERVER
  
  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide:1,
    speed: 400,
    interval:{
      timing:3000,
      initialDelay:1000,
    },
    point: {
      visible: false
    },
    loop: true,
    load: 2
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  onUserProfileImage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = false
    dialogConfig.width = "600px";
    dialogConfig.height = "auto";
    if (this.sliderImages != null && this.sliderImages != undefined) {
      dialogConfig.data = this.sliderImages
    }
    this.uploadDialogRef = this.dialog.open(PopUpSliderComponent, dialogConfig)
  }
}
