import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/auth/auth-services/login.service';
import { GloqrAdminTokenService } from '../gloqr-admin-services/gloqr-admin-token.service';

@Component({
  selector: 'app-gloqr-login',
  templateUrl: './gloqr-login.component.html',
  styleUrls: ['./gloqr-login.component.css']
})
//gloqr login component 
export class GloqrLoginComponent implements OnInit {

  sauthForm: FormGroup;
  hide = true;
  loginButton: boolean = true
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private gloqrAdminTokenService: GloqrAdminTokenService) { }

  ngOnInit() {
    this.sauthForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }

  login(loginCredentials) {
    if (this.sauthForm.controls['username'].valid && this.sauthForm.controls['password'].valid) {
      this.loginButton = false;
      this.loginService.login(loginCredentials).subscribe(
        res => {
          if (res.error && res.code == 401) {
            this.loginButton = true
            this.sauthForm.controls['password'].setErrors({
              "passwordNotFound": true
            });
          }
          else {
            this.gloqrAdminTokenService.setSuperAdminToken(res.data.token);
            if(this.gloqrAdminTokenService.isGloqrUser())
            {
              this.router.navigateByUrl('/gloqr-admin/new-smes');
            }
            else{
              localStorage.clear();
              this.loginButton = true
              window.alert("Forbidden: You don't have authority..")
            }
          }
        },
        err => {
          if (err.error.status == 403) {
            this.sauthForm.controls['username'].setErrors({
              "usernameNotFound": true
            });
          }
        }
      )
    } else {
      return false
    }
  }


}
