import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from 'environments/environment';
import { SocialService } from 'app/social/social-service/social.service';
import { TokenService } from '@services/token/token.service';
import { BusinessCircle, SMECircleDto } from '@models/business-circle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SMEInformationVo } from '@models/sme';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css']
})
export class RightSideComponent implements OnInit {

  suggestions: SMECircleDto[]
  smeNotFound: boolean = false
  sUuid: string
  contentServer: string = environment.CONTENT_SERVER
  isDisableId: string


  //PAGE SIZE
  size: number = 10;

  constructor(private socialService: SocialService, private token: TokenService, private snackbar: SnackBarService) { }
  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.socialService.getSuggestions(null, this.size).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.suggestions = res.data;
        }
      },
      err => {
        this.smeNotFound = true
      }
    );
  }
  onaddConnection(suggestion: SMECircleDto, index) {
    this.isDisableId = suggestion.sUuid
    let circle = new BusinessCircle()
    circle.smeId = suggestion.sUuid
    this.socialService.addBusinessRequest(circle).subscribe(
      response => {

        if (response.error && response.code === 404) {
          this.isDisableId = null
          window.alert("This functionality will be active as soon as your SME is Verified by our gloqr team")
        }
        else if (response.error && response.customErrorCode === 100) {
          window.alert("Request already sent to given SME");
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("Already Connected");
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert("Already in Receive Request");
        }
        else {
          this.snackbar.open('Invitation Sent to ' + suggestion.smeName);
          this.suggestions.splice(index, 1);
          this.socialService.incSentReqCount();
        }
      },
    )
  }
  onPeopleYouKnow() {
    let url = 'circle/'
    window.open(url, '_blank')
  }

}
