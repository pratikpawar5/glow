import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationVo } from '@models/sme';
import { environment } from 'environments/environment';
import { TokenService } from '@services/token/token.service';
import { CartService } from '@services/cart/cart.service';
import { BusinessCircle } from '@models/business-circle';
import { ExtraService } from '@services/common/extra.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { YoutubeVideoComponent } from 'app/shared/components/youtube-video/youtube-video.component';

@Component({
  selector: 'app-sme-home-header',
  templateUrl: './sme-home-header.component.html',
  styleUrls: ['./sme-home-header.component.css']
})

//sme home nav bar after login
export class SmeHomeHeaderComponent implements OnInit {

  navbarCollapsed: boolean = true;
  @Input()
  smes: SMEInformationVo;
  userName: string
  contentServer: string = environment.CONTENT_SERVER
  cartCount: number
  profileImage: string
  uuid:string
  /*Social Count */
  profileResponse: BusinessCircle;
  myconnectionCount: number = 0
  sentCount: number = 0
  pendingCount: number = 0
  sUuid:string
  constructor(private token: TokenService,private dialog: DialogService,private matDialog: MatDialog,private extraService: ExtraService, private cart: CartService) { }

  ngOnInit() {
    this.userName = this.token.getUserName();
    this.uuid = this.token.getUserId();
    this.sUuid = this.token.getSmeId();
    this.cart.countFromSever()
    this.profileImage = this.token.getProfileImage();
    this.cart.getCartCount().subscribe(
      res => {
        this.cartCount = res
      }
    )
    this.extraService.getCircleCount().subscribe(
      res => {
        if (res.error && res.code === 404) {

        }
        else {
          this.profileResponse = res.data;
          this.myconnectionCount = this.profileResponse.connectionCount
          this.sentCount = this.profileResponse.sendReqCount
          this.pendingCount = this.profileResponse.receivedReqCount
        }
      }
    )
  }
  scrolltoTop() {
    window.scrollTo(0, 0)
  }
  logout() {
    this.token.clearTokenAndLogout()
  }
  openVideoPopUp()
  {
    this.matDialog.open(YoutubeVideoComponent, this.dialog.getOpenYoutubeVideoDialog())

  }
}
