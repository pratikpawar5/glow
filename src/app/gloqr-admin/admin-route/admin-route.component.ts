import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GloqrAdminTokenService } from '../gloqr-admin-services/gloqr-admin-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-route',
  templateUrl: './admin-route.component.html',
  styleUrls: ['./admin-route.component.css']
})

//Admin Route component include left menu 1]Dashboard 2]Add External Category 3]New SME's 4]Existing SME's

export class AdminRouteComponent implements OnInit {

  isLoggedIn: boolean;
  options: FormGroup;
  isSuperAdmin: boolean;
  windowScrolled: boolean;

  constructor(fb: FormBuilder, private gloqrAdminTokenService: GloqrAdminTokenService,
    private router: Router) {
    this.options = fb.group({
      bottom: 1,
      fixed: true,
      top: 55
    });
  }

  ngOnInit() {
    this.gloqrAdminTokenService.isLoggedIn().subscribe(
      res => {
        this.isLoggedIn = res

        if (this.gloqrAdminTokenService.isSuperAdmin()) {
          this.isSuperAdmin = true
        }
      }
    )
    window.scrollTo(0, 0)
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 500) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset < 50) {
      this.windowScrolled = false;
    }
  }
}
