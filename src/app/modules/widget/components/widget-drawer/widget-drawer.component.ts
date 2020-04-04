import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget-service.';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { Widget } from '../../models/Widget';
import { ModalController } from '@ionic/angular';
import { CreateWidgetPage } from '../../pages/create-widget/create-widget.page';

@Component({
  selector: 'app-widget-drawer',
  templateUrl: './widget-drawer.component.html',
  styleUrls: ['./widget-drawer.component.scss'],
})
export class WidgetDrawerComponent implements OnInit {
  keys//: Promise<string[]>
  Widgets : Widget[]
  items : ShoppingKartModel[] = []

  async createWidget(){
    console.log('creating widget')
    const modal = await this.modalController.create({ component: CreateWidgetPage })
    return await modal.present()
  }

  constructor(public service: WidgetService,public karts:ShoppingKartsService,
    public modalController: ModalController,) {
    this.service.connectToIDB().then(() => {
      this.service.keys((keys: Promise<any>) => {
        this.keys = keys
        keys.then(k => {
          console.log('keys', k)
        })
      })
      this.karts._items.subscribe((karts:ShoppingKartModel[])=>{
        this.items = karts
      })
      this.service._widgets.subscribe((items:Widget[])=>{
        this.Widgets = items
        console.log('widgets',items)
      })
      this.service._widgets.subscribe((widgets)=>{
        this.Widgets = widgets
        console.log('got widgets',widgets)
      })
      
      /* 
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
      }) */
    })
  }

  ngOnInit() { }

}
