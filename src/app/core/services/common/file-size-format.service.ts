import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSizeFormatService {

  private bytes:number = 1048576;

  constructor() { }

  formatSizeUnits(bytes:number){
    return Math.round(bytes / (1024 * 1024)) + ' MB'
  }

  toMb(bytes:number){
    return (bytes / (1024 * 1024)).toPrecision(4) + ' MB'
  }

  mbToBytes(credits:number){
    return this.bytes * credits;
  }


}
