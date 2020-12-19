import { Component, OnInit } from '@angular/core';
import { SMEManagementTeam } from '@models/management-team';
import { environment } from 'environments/environment';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sme-management-team',
  templateUrl: './sme-management-team.component.html',
  styleUrls: ['./sme-management-team.component.css']
})
export class SmeManagementTeamComponent implements OnInit {

  smeManegementTeams: Array<SMEManagementTeam>
  showImages: boolean
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER

  constructor(private smeService: SmeService,private title: PageTitleService,router:Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
   }

  ngOnInit() {
    this.smeService.smeManagementTeam(null).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else
        {
          this.smeManegementTeams = res.data
          this.showSpinner = false
        }
     
      },
      err=>
      {
        
      }
    )
  }

}
