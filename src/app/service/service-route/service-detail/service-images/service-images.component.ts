import { Component, OnInit, Input } from '@angular/core';
import { Service } from '@models/service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-service-images',
  templateUrl: './service-images.component.html',
  styleUrls: ['./service-images.component.css']
})
export class ServiceImagesComponent implements OnInit {

  @Input()
  service: Service
  contentServer:string = environment.CONTENT_SERVER
  selectedImage : string
  
  constructor() { 
    
  }

  ngOnInit() {
    this.selectedImage = this.service.images[0].fileLocationOne
  }

  onMouseOver(fileLocation : string){
    this.selectedImage = fileLocation
  }
}
