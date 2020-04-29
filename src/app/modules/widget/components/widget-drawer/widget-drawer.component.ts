import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetService } from '../../services/widget-service.';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { Widget } from '../../models/Widget';
import { ModalController } from '@ionic/angular';
import { CreateWidgetPage } from '../../pages/create-widget/create-widget.page';
import { EditWidgetPage } from '../../pages/edit-widget/edit-widget.page';

@Component({
  selector: 'app-widget-drawer',
  templateUrl: './widget-drawer.component.html',
  styleUrls: ['./widget-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetDrawerComponent implements OnInit {
  keys//: Promise<string[]>
  Widgets: Widget[]
  items: ShoppingKartModel[] = []

  async createWidget() {
    const modal = await this.modalController.create({ component: CreateWidgetPage })
    return await modal.present()
  }

  deleteWidget(widget, sliding_item) {
    sliding_item['close']()
    this.service.delete(widget.id, (pr: Promise<any>) => {
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



  constructor(public service: WidgetService, public karts: ShoppingKartsService,
    public modalController: ModalController, ) {
    this.service.connectToIDB().then(() => {
      this.service.keys((keys: Promise<any>) => {
        this.keys = keys
        keys.then(k => {
        })
      })
      this.service.widgetsList.subscribe(widgets => {
      })
      this.karts._items.subscribe((karts: ShoppingKartModel[]) => {
        this.items = karts
      })
      /* this.service._widgets.subscribe((items: Widget[]) => {
        this.Widgets = items
        // console.log('widgets',items)
      })
      this.service._widgets.subscribe((widgets: Widget[]) => {
        this.Widgets = widgets

        //console.log('got widgets',widgets)
      }) */


    })
  }

  ngOnInit() { }

}
