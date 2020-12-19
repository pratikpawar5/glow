import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {
  isDesktopDevice: boolean
  isMobile: boolean
  isTablet: boolean
  constructor(private youtubeVideoDialogComponent: MatDialogRef<YoutubeVideoComponent>,private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isDesktopDevice = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet  = this.deviceService.isTablet();
  }
  onClickClose() {
    localStorage.setItem('video','true')
    this.youtubeVideoDialogComponent.close();
  }
}
