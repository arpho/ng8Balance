import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import Quagga from 'quagga'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  quagga

  constructor(private barcodeScanner:BarcodeScanner) { 
    const Quagga = require('quagga').default;
    
  }

  ngOnInit() {}
  scann(){
    console.log('scanning')
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
