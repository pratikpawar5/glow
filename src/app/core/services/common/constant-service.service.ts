import { Injectable } from '@angular/core';
import { QuotationFormat, GST } from '@models/common';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  private maxFileSize: number = 307200
  private quotationFormats: Array<QuotationFormat> = [
    {
      name: "Format 1 (default)",
      value: "FORMAT_ONE",
      url: "format1.pdf"
    },
    {
      name: "Format 2",
      value: "FORMAT_TWO",
      url: "format2.pdf"
    },
    {
      name: "Format 3",
      value: "FORMAT_THREE",
      url: "format3.pdf"
    }
  ]
  private gstSlabs: Array<GST> = [
    {
      name: "0 %",
      value: 0
    },
    {
      name: "5 %",
      value: 5
    },
    {
      name: "12 %",
      value: 12
    },
    {
      name: "18 %",
      value: 18
    },
    {
      name: "28 %",
      value: 28
    }
  ]
  private documentFormats: Array<string> = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/txt",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  private imageFormats: Array<string> = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif"
  ]

  private resumeFormats: Array<string> = [
    "application/pdf",
    "application/msword",
    "application/doc",
    "application/docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  private getMaxResumeFileSize: number = 1048576

  constructor() { }

  getMaxFileSize(): number {
    return this.maxFileSize
  }

  getQuotationFormats(): Array<QuotationFormat> {
    return this.quotationFormats;
  }

  getGSTSlabs(): Array<GST> {
    return this.gstSlabs;
  }

  getDocumentFormats(): Array<string> {
    return this.documentFormats;
  }

  getImageFormats(): Array<string> {
    return this.imageFormats;
  }

  getResumeFormats(): Array<string> {
    return this.resumeFormats;
  }

  getMaxResumeSize(): number {
    return this.getMaxResumeFileSize;
  }

}
