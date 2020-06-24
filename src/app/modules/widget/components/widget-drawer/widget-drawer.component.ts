import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetService } from '../../services/widget-service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { Widget } from '../../models/Widget';
import { ModalController } from '@ionic/angular';
import { CreateWidgetPage } from '../../pages/create-widget/create-widget.page';
import { EditWidgetPage } from '../../pages/edit-widget/edit-widget.page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-widget-drawer',
  templateUrl: './widget-drawer.component.html',
  styleUrls: ['./widget-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetDrawerComponent implements OnInit {
  keys
  widgetsCount = 0
  Widgets: Widget[]
  items: BehaviorSubject<ShoppingKartModel[]> // = []

  async createWidget() {
    const modal = await this.modalController.create({
      component: CreateWidgetPage,
      componentProps: { order: this.widgetsCount }
    })
    return await modal.present()
  }

  deleteWidget(widget, sliding_item) {
    sliding_item['close']()
    this.service.delete(widget.key, (pr: Promise<any>) => {
      pr.then(res => {
      })
    })
  }

  async updateWidget(widget, sliding_item) {
    sliding_item['close']()
    const modal = await this.modalController.create({
      component: EditWidgetPage,
      componentProps: { widget }
    })
    return await modal.present()
  }

  doReorder(ev) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to)
    ev['complete']()
  }



  constructor(public service: WidgetService, public karts: ShoppingKartsService,
    public modalController: ModalController,) {
    this.items = this.karts._items
    this.service.widgetsList.subscribe(widgets => {
      this.widgetsCount = widgets.length
    })
    this.karts._items.subscribe((karts: ShoppingKartModel[]) => {
      // this.items =[... karts]

    })



  }

  ngOnInit() { }

}
