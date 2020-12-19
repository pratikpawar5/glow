import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { ViewQuotationComponent } from 'app/cart/dialog-boxes/view-quotation/view-quotation.component';
import { CartItem } from '@models/cart';

@Component({
  selector: 'app-user-cart-item-status',
  templateUrl: './user-cart-item-status.component.html',
  styleUrls: ['./user-cart-item-status.component.css']
})
export class UserCartItemStatusComponent implements OnInit {

  @Input()
  item: CartItem;

  acceptDialogRef: MatDialogRef<ViewQuotationComponent>;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }

  firstStage() {
    this.openViewDialog(this.item.firstStage)
  }

  secondStage() {
    this.openViewDialog(this.item.secondStage)
  }

  thirdStage() {
    this.openViewDialog(this.item.thirdStage)
  }

  openViewDialog(data: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = data

    this.dialog.open(ViewQuotationComponent, dialogConfig)
  }
}
