import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { BusinessCircle } from '@models/business-circle';
import { TokenService } from '@services/token/token.service';
import { SocialService } from '../social-service/social.service';
import { Subscription } from 'rxjs';
import { SMEInformationVo } from '@models/sme';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-profile-contents',
  templateUrl: './profile-contents.component.html',
  styleUrls: ['./profile-contents.component.css']
})
export class ProfileContentsComponent implements OnInit {

  @Input()
  profileResponse: BusinessCircle;

  @Input()
  smes: SMEInformationVo

  myconnectionCount: number = 0
  sentCount: number = 0
  pendingCount: number = 0
  sUuid: string
  subscription$: Subscription
  contentServer: string = environment.CONTENT_SERVER
  /*Device Detector */
  isDesktopDevice: boolean
  constructor(private token: TokenService, private social: SocialService, private deviceService: DeviceDetectorService) {

  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    if (this.deviceService.isDesktop || this.deviceService.isTablet) {
      this.isDesktopDevice = true
    }
    if (this.profileResponse) {

      this.social.setSentReqCount(this.profileResponse.sendReqCount)

      this.social.getSentReqCount().subscribe(
        res => {
          this.sentCount = res
        }
      )
      this.social.setMyConnReqCount(this.profileResponse.connectionCount)

      this.social.getMyConnReqCount().subscribe(
        res => {
          this.myconnectionCount = res
        }
      )


      this.social.setPendingReqCount(this.profileResponse.receivedReqCount)

      this.social.getPendingReqCount().subscribe(
        res => {
          this.pendingCount = res
        }
      )


    }
  }

}
