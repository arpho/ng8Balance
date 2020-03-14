import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget-service.';

@Component({
  selector: 'app-widget-drawer',
  templateUrl: './widget-drawer.component.html',
  styleUrls: ['./widget-drawer.component.scss'],
})
export class WidgetDrawerComponent implements OnInit {
  keys//: Promise<string[]>

  constructor(public service: WidgetService) {
    this.service.connectToIDB().then(() => {
      this.service.keys((keys: Promise<any>) => {
        this.keys = keys
        keys.then(k => {
          console.log('keys', k)
        })
      })
      const test = { a: 1, b: 2, c: 3 ,d:4}
      this.service.put('test1', test, (p: Promise<any>) => {
        p.then(v => {
          console.log('put', v)
        })
      })
      this.service.get('test1', (p: Promise<any>) => {
        p.then(v => {
          console.log('got', v)
        })
      })
    })
  }

  ngOnInit() { }

}
