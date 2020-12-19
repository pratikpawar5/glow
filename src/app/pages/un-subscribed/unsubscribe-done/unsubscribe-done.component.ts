import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unsubscribe-done',
  templateUrl: './unsubscribe-done.component.html',
  styleUrls: ['./unsubscribe-done.component.css']
})
export class UnsubscribeDoneComponent implements OnInit {
  unSubscribeEmailId: string
  subcription$: Subscription
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subcription$ = this.route.params.subscribe(
      params => {
        this.unSubscribeEmailId = params['unSubscribeEmailId'];
      })

  }

}
