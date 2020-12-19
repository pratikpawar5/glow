import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationDto } from '@models/sme';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sme-home-footer',
  templateUrl: './sme-home-footer.component.html',
  styleUrls: ['./sme-home-footer.component.css']
})

//sme home fotoer bar after login
export class SmeHomeFooterComponent implements OnInit {
  
  @Input()
  smeInfo:Array<SMEInformationDto>;
  contentServer:string = environment.CONTENT_SERVER
  constructor() { }

  ngOnInit() {
  }
  scrolltoTop() {
    window.scrollTo(0, 0)
  }

}
