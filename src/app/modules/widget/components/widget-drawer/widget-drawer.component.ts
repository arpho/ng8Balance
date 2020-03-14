import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget-service.';

@Component({
  selector: 'app-widget-drawer',
  templateUrl: './widget-drawer.component.html',
  styleUrls: ['./widget-drawer.component.scss'],
})
export class WidgetDrawerComponent implements OnInit {
  keys//: Promise<string[]>

  constructor(public service:WidgetService) {
    this.service.connectToIDB().then(()=>{
      this.keys= this.service.keys()
    })
   }

  ngOnInit() {}

}
