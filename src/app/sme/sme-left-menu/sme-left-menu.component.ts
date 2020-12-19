import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-sme-left-menu',
  templateUrl: './sme-left-menu.component.html',
  styleUrls: ['./sme-left-menu.component.css']
})
export class SmeLeftMenuComponent implements OnInit {

  @Input()
  sUuid: string
  constructor(public router: Router) {
  }
  ngOnInit() {
  }

}
