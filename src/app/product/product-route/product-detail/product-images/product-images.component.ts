import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  @Input()
  product: Product
  contentServer: string = environment.CONTENT_SERVER
  selectedImage: string


  constructor() {
  }

  ngOnInit() {
    this.selectedImage = this.product.images[0].fileLocationOne
  }

  onMouseOver(fileLocation: string) {
    this.selectedImage = fileLocation
  }

}
