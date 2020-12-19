import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFProgressData } from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  pdfSrc:string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
      res => this.pdfSrc = res['source']
    )
  }

  ngOnInit() {
  }

  onError(event:any){
    this.pdfSrc = undefined
  }
}
