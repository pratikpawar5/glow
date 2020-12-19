import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { PaymentService } from '@services/payment/payment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { PaymentInfoComponent } from 'app/shared/components/payment-info/payment-info.component';
declare var ga: Function;
@Component({
  selector: 'app-list-on-gloqr',
  templateUrl: './list-on-gloqr.component.html',
  styleUrls: ['./list-on-gloqr.component.css']
})
export class ListOnGloqrComponent implements OnInit {

  constructor(private token: TokenService, private payment: PaymentService,
    private router: Router, private matDialog: MatDialog, private dialog: DialogService) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    if (this.token.isLoggedIn() && this.token.isNormalUser()) {
      this.payment.isPaymentCompleted(this.token.getUserId()).subscribe(
        res => {
          if (res.error && res.code === 208) {
            let data = {
              message: res.message,
              firstPayment:true,
              homePage:false
            }
            let ref = this.matDialog.open(PaymentInfoComponent, this.dialog.getPaymentInfoConfig(data))
            ref.afterClosed().subscribe(
              res => {
                if (res) {
                  this.router.navigateByUrl('list-on-gloqr/first-step')
                }
              }
            )
          }
        }
      )
    }
  }

}
