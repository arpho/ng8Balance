import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { IonicModule } from '@ionic/angular';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BarcodeScannerComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  exports:[BarcodeScannerComponent]
})
export class BarcodeModule { }
