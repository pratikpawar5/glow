import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { LazySmeService } from 'app/service/http-service/lazy-sme.service';
import { Subscription } from 'rxjs';
import { Service } from '@models/service';
declare var ga: Function;
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  subcription$: Subscription
  service: Service
  sUuid: string
  showSpinner: boolean = true
  notFound: boolean

  constructor(private route: ActivatedRoute, private token: TokenService,
    private lazyService: LazySmeService, router: Router) {
    this.subcription$ = this.route.params.subscribe(
      params => {
        this.getService(params['serviceUuid'])
      }
    )
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
  }

  getService(serviceUuid: string) {

    if (this.token.isLoggedIn()) {
      if(this.token.isSME()){
        this.sUuid = this.token.getSmeId()
      }
    }
    this.lazyService.serviceDetail(serviceUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.service = res.data
          this.showSpinner = false
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
  }

}
