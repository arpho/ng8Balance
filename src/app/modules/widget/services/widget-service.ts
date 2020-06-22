import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Schedule } from '../../../app.component'
import { promise } from 'protractor';
import { values } from 'd3';
import { Widget } from '../models/Widget';
import { ConnectionServiceModule } from 'ng-connection-service';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { ItemServiceInterface } from '../../item/models/ItemServiceInterface';
import { EntityWidgetServiceInterface } from '../models/EntityWidgetServiceInterface';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from '../models/WidgetsTypes';
import { WidgetSince } from '../models/WidgetSince';
import * as firebase from 'firebase';
import { SelectorItemsComponent } from '../../item/components/selector-items/selector-items.component';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(public service: WidgetService, public categoriesService: CategoriesService, public SuppliersService: SuppliersService, public paymentsService: PaymentsService) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.widgetListRef = firebase.database().ref(`/widgets/${user.uid}/`);
        
        this.loadAllWidgets()
      }
    });
  }

  populateWidgetsList = snap => {
    const widget = this.widgetFactory(snap.val().widget).load(snap.val())
    // widget loaded it still miss item
    const service = this.getWidgetService(widget.serviceKey)
    service && this.setItem(service, widget)
    const settingItem = (item) => {
      const entity = service.instatiateItem(item.val())
      entity.key = item.key
      widget.item = entity
      widget.service = service

    }

    service && service.getItem(widget.entityKey).on('value', settingItem)


    this.items_list.push(widget);
  }


  loadAllWidgets() {
    this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
      this.items_list = [];
      eventCategoriesListSnapshot.forEach(this.populateWidgetsList);
      this._widgetsList.next(this.items_list)
    });
  }

  Keys: string[]
  public readonly _widgetsList: BehaviorSubject<Array<Widget>> = new BehaviorSubject([])
  widgetsList: Observable<Array<Widget>> = this._widgetsList.asObservable()
  WidgetList: Widget[] = []

  private _dbgetItem
  storeName = 'widgetsList';
  widgets_list: Array<Widget>
  widgetsServices: EntityWidgetServiceInterface[] = [this.categoriesService, this.paymentsService, this.SuppliersService]
  widgetListRef: firebase.database.Reference;
  items_list: any[];

  updateWidget(item: any) {
    return this.widgetListRef.child(item.key).update(item);
  }


  setItem(service: EntityWidgetServiceInterface, widget: Widget) {
    service.getItem(widget.entityKey).on('value', (item) => {
      const entity = service.instatiateItem(item.val())
      entity.key = item.key
      widget.item = entity
      widget.service = service
    })
  }

  getWidgetService(serviceKey) {
    return this.widgetsServices.filter(service => {
      return service.key == serviceKey
    })[0]
  }

  getEntitiesList(): firebase.database.Reference {
    return this.widgetListRef;
  }




  widgetFactory(type: number): Widget {
    const widgets = {}
    widgets[WidgetTypes.Regular] = new Widget()
    widgets[WidgetTypes.Since] = new WidgetSince()
    return widgets[type]
  }

  async delete(key, next) {
    this.widgetListRef.child(key).remove()
  }





  get(key: string, next?: (v: Promise<any>) => void) {
    return this.widgetListRef.child(key)
  }

  async add(widget) {
    console.log('adding ', widget)
    this.widgetListRef.push(widget)

  }



}
