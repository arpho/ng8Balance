import { Component, OnInit, Input, ChangeDetectionStrategy,  } from '@angular/core';
import { Widget } from '../../models/Widget';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit {
  @Input() Widget:Widget
  @Input() items:ItemModelInterface[]

  constructor() { }

  ngOnInit() {}

}
