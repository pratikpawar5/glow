import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-object-verification',
  templateUrl: './object-verification.component.html',
  styleUrls: ['./object-verification.component.css']
})
export class ObjectVerificationComponent implements OnInit {
  baseComponentUrl: string
  sUuid: string
  uuid: string
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.baseComponentUrl = this.route.snapshot.params['baseComponentUrl']
    this.sUuid = this.route.snapshot.params['sUuid']
    this.uuid = this.route.snapshot.params['uuid']
  }
}
