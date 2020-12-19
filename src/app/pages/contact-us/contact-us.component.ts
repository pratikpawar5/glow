import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { AddressService } from '@services/common/address.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
declare var ga: Function;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  form: FormGroup
  showMsg: string
  showSpinner: boolean
  showButton:boolean = true

  constructor(private title: PageTitleService, private router: Router,
    private service: AddressService, private formBuilder: FormBuilder) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.title.updateTitle('Contact Us')
    this.title.updateMetaTitle('Contact Us')
    this.title.updateMetaInfo('Gloqr Contact Us')
    this.title.updateMetaURL(this.router.url)

    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(11),Validators.pattern('^[0-9]*$')]),
      email: new FormControl(null, [Validators.email]),
      message: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
    })
  }


  send() {
    if (this.form.valid) {
      this.showButton = false
      this.showSpinner = true
      this.service.saveContactUs(this.form.value).subscribe(
        res => {
          if (!res.error) {
            this.showSpinner = false
            this.form.reset()
            this.form.markAsUntouched()
            this.showMsg = "Request Submitted Successfully!!"
          }
        },
      )
    }
  }

}
