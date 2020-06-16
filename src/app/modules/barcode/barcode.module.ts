import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './components/scanner/scanner.component';
import { IonicModule } from '@ionic/angular';





@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,IonicModule.forRoot()
  ],
  exports:[ScannerComponent]
})
export class BarcodeModule { }
