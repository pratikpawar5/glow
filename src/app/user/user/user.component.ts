import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User
  constructor(private titleService: PageTitleService, private userService: UserService,
    router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.titleService.updateTitle('My Profile')
    this.userService.getUserProfile().subscribe(
      res => {
        if (!res.error) {
          this.user = res.data
        }
      }
    )
     

  }

}
