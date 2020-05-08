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
    this.items.subscribe(karts=>{
      this.Widget.items_list = karts
    })
  }

  ngOnInit() {
}

}
