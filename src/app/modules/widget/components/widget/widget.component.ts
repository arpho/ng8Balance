import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges,  } from '@angular/core';
import { Widget } from '../../models/Widget';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit, OnChanges {
  @Input() Widget:Widget
  @Input() items:BehaviorSubject<ItemModelInterface[]>

  constructor() {
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes on widget',changes)
    this.items.subscribe(karts=>{
      console.log('widget got karts',karts)
    })
  }

  ngOnInit() {}

}
