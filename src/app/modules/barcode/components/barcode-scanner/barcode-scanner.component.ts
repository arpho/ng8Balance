

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { BeepService } from './beep.service';
import Quagga from 'quagga';
import { DECODER_LIVE_CONFIG } from '../../config/decoder-config';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
