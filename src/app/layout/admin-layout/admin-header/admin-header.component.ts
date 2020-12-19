import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
//gloqr admin header
export class AdminHeaderComponent implements OnInit {
  @Input()
  isLoggedIn:boolean

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    window.location.reload();
    this.router.navigateByUrl('/gloqr-admin/login');
  }
  scrolltoTop() {
    window.scrollTo(0, 0)
  }

}
