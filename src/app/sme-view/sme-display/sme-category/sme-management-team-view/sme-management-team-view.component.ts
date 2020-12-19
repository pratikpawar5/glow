import { Component, OnInit } from '@angular/core';
import { SMEManagementTeam } from '@models/management-team';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@services/sme/sme.service';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
declare var ga: Function;
@Component({
  selector: 'app-sme-management-team-view',
  templateUrl: './sme-management-team-view.component.html',
  styleUrls: ['./sme-management-team-view.component.css']
})
export class SmeManagementTeamViewComponent implements OnInit {

  smeManegementTeams: Array<SMEManagementTeam>
  status: string = 'active'
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER

  constructor(private route: ActivatedRoute, private title: PageTitleService, private smeService: LazySmeViewService,
    router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Management Team')
    let sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']


    this.smeService.smeTeams(sUuid).subscribe(
      res => {
        if(res.error)
        {
          this.showSpinner = false
          this.notFound = true
        }
        else{
          this.smeManegementTeams = res.data
          this.showSpinner = false

        }
      }
    )

  }

}
