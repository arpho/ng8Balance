

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { BeepService } from './beep.service';
import Quagga from 'quagga';
// import { DECODER_LIVE_CONFIG } from '../../config/decoder-config';
import { scan } from 'rxjs/operators';
import { AudioService } from '../../services/audio.service';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit, ControlValueAccessor {

  errorMessage: string
  barcode: string
  show = true
  private disabled = false
  onChange: any = () => { };
  // tslint:disable-next-line: ban-types
  onTouched: any = () => { };

  constructor(private audio: AudioService) {
    this.audio.preload('detected', '../assets/audio/barcode.wav')
    this.audio.preload('wrong', '../assets/audio/wrong.mp3')

  }
  writeValue(barcode: string): void {
    this.barcode = barcode

  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnInit() {


  }
  scanCode() {
    this.show = true


    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment' // restrict camera type
        },
        area: { // defines rectangle of the detection
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader'] // restrict code types
      },
    },
      (err) => {
        if (err) {
          this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
          this.audio.play('wrong')
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            Quagga.stop()
            this.audio.play('detected')
            this.barcode = res.codeResult.code
            console.log('barcode', this.barcode)
            this.show = false

            // window.alert(`code: ${res.codeResult.code}`);
          })
        }
      });


  }

}


