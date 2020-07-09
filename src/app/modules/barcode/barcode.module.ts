import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';



@NgModule({
  declarations: [BarcodeScannerComponent],
  imports: [
    CommonModule
  ]
})
export class BarcodeModule { }
