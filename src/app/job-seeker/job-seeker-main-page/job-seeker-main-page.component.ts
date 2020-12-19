import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-job-seeker-main-page',
  templateUrl: './job-seeker-main-page.component.html',
  styleUrls: ['./job-seeker-main-page.component.css']
})
//  job seeker landing page following are the left menu display
export class JobSeekerMainPageComponent implements OnInit {

  uuid:string
  options: FormGroup;
  constructor(fb: FormBuilder,private token:TokenService) {
    this.options = fb.group({
      bottom: 1,
      fixed: true,
      top: 55
    });
   }

  ngOnInit() {
    this.uuid=this.token.getUserId();
  }

}
