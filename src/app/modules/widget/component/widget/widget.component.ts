import { Component, OnInit, Input,  } from '@angular/core';
import { Widget } from '../../models/Widget';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  @Input() Widget:Widget

  constructor() { }

  ngOnInit() {}

}
