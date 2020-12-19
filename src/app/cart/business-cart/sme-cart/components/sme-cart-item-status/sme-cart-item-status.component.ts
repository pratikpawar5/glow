import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CartItem } from '@models/cart';
import { ViewQuotationComponent } from 'app/cart/dialog-boxes/view-quotation/view-quotation.component';

@Component({
  selector: 'app-sme-cart-item-status',
  templateUrl: './sme-cart-item-status.component.html',
  styleUrls: ['./sme-cart-item-status.component.css']
})
export class SmeCartItemStatusComponent implements OnInit {

  @Input()
  item: CartItem

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  firstStage(){
    this.openViewDialog(this.item.firstStage)
  }

  secondStage(){
    this.openViewDialog(this.item.secondStage)
  }

  thirdStage(){
    this.openViewDialog(this.item.thirdStage)
  }

  openViewDialog(data:any){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = data
    
    this.dialog.open(ViewQuotationComponent,dialogConfig)
  }
}
