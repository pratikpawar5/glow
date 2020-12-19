import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtraService } from '@services/common/extra.service';
import { Router } from '@angular/router';
export interface Unit {
  value: string;
  viewValue: string;
}
declare var ga: Function;
@Component({
  selector: 'app-un-subscribed',
  templateUrl: './un-subscribed.component.html',
  styleUrls: ['./un-subscribed.component.css']
})
export class UnSubscribedComponent implements OnInit {
  unSubscribeForm: FormGroup;
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  showButton: boolean = true
  constructor(private formBuilder: FormBuilder, private extraService: ExtraService, private router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
   }

  ngOnInit() {
    this.unSubscribeForm = this.formBuilder.group({
      unSubscribeEmailId: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      unSubscribeReason: new FormControl(null, [Validators.maxLength(500)]),
    })
  }

  onClickUnsubscribe() {
    let unSubscribeEmailId: string = this.unSubscribeForm.controls['unSubscribeEmailId'].value
    if (this.unSubscribeForm.valid) {
      this.showButton = false

      this.extraService.unSubscribeEmail(this.unSubscribeForm.value).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
          }
          else {
            this.router.navigate(['/pages/sumnb', unSubscribeEmailId]);
          }

        }
      )
    }

  }
}
