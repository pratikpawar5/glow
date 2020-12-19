import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabs = ['Newly Registerd Users', 'Business Interest', 'Business Circle', 'Job Applied'];
  selected = new FormControl(0);
  selectedIndex: number = 0;
  constructor() {
  }

  ngOnInit() {
    this.selected.valueChanges.subscribe(res => {
      this.selectedIndex = res
    })
  }

}
