import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Schedule } from '../../../app.component'
import { promise } from 'protractor';
import { values } from 'd3';
import { Widget } from '../models/Widget';
import { IDBWidgetServiceService } from './idbwidget-service.service';
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



  constructor(public service: WidgetService, public idbService: IDBWidgetServiceService, public categoriesService: CategoriesService, public SuppliersService: SuppliersService, public paymentsService: PaymentsService) {

    // this.initializeWidget()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.widgetListRef = firebase.database().ref(`/widgets/${user.uid}/`);
        this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const widget = this.widgetFactory(snap.val().widget).load(snap.val())
            console.log('loaded widget',widget)
            // widget loaded it still miss item
            const service = this.getWidgetService(widget.serviceKey)
            console.log('service',service)
            service && this.setItem(service, widget)

            if (service) {
              service.getItem(widget.entityKey).on('value', (item) => {
                const entity = service.instatiateItem(item.val())
                entity.key = item.key
                widget.item = entity
                widget.service = service

              })
            }

            console.log('widget', widget)
            this.items_list.push(widget);
          });
          this._widgetsList.next(this.items_list)
        });
      }
    });
    this.loadWidget()
    this.widgets_list = []
    this.idbService.keys(keys => {
      keys.then(keysList => {
      })
    }, 'widget-service')
  }


  setItem(service: EntityWidgetServiceInterface, widget: Widget) {
    service.getItem(widget.entityKey).on('value', (item) => {
      const entity = service.instatiateItem(item.val())
      entity.key = item.key
      widget.item = entity
      widget.service = service
      console.log('widget', widget)
    })
  }

  getWidgetService(serviceKey) {
    return this.widgetsServices.filter(service => { 
      return service.key == serviceKey })[0]
      console.log('service',this.widgetsServices.filter(service => { 
        return service.key == serviceKey })[0])
  }

  getEntitiesList(): firebase.database.Reference {
    return this.widgetListRef;
  }


  keys(next) {
    this.idbService.keys(next, 'wrapping keys')
  }

  widgetFactory(type: number): Widget {
    const widgets = {}
    widgets[WidgetTypes.Regular] = new Widget()
    widgets[WidgetTypes.Since] = new WidgetSince()
    return widgets[type]
  }


  loadWidget() {
    this.WidgetList = []
    this.idbService.keys((keys: Promise<any>) => {
      keys.then(keyring => {
        keyring.forEach(element => {
          this.idbService.get(element, (item => {
            item.then(value => {
              const widget = this.widgetFactory(value.widget).load(value)
              widget.id = element
              if (value.key) // è un widget
                if (widget.entityKey) {
                  const service = this.widgetsServices.filter((item: EntityWidgetServiceInterface) => {
                    return item.key === widget.serviceKey
                  })[0]
                  if (service) {
                    service.getItem(widget.entityKey).on('value', (item) => {
                      const entity = service.instatiateItem(item.val())
                      entity.key = item.key
                      widget.item = entity
                      widget.service = service

                    })
                  }
                }
              this.WidgetList.push(widget)
              //console.log('widgetList', this.WidgetList)
              this._widgetsList.next(this.WidgetList)
            })
          }))
        });
      })
    }, 'new initializeing')

  }
  async delete(key, next) {
    this.widgetListRef.child(key).remove()
  }


  put(key: string, value: any, next?: (v) => void) {
    this.idbService.put(key, value, next)
  }


  get(key: string, next?: (v: Promise<any>) => void) {
    return this.widgetListRef.child(key)
  }

  async add(widget) {
    console.log('adding ', widget)
    this.widgetListRef.push(widget)

  }



}
