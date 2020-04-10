import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Schedule } from '../../../app.component'
import { promise } from 'protractor';
import { values } from 'd3';
import { Widget } from '../models/Widget';
import { IDBWidgetServiceService } from './idbwidget-service.service';
import { ConnectionServiceModule } from 'ng-connection-service';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  Keys: string[]
  public readonly _widgetsList: BehaviorSubject<Array<Widget>> = new BehaviorSubject([])
  widgetsList: Observable<Array<Widget>> = this._widgetsList.asObservable()
  WidgetList: Widget[] = []

  private _db
  storeName = 'widgetsList';
  widgets_list: Array<Widget>

  constructor(public service: WidgetService, public idbService: IDBWidgetServiceService) {

    this.connectToIDB()
    // this.initializeWidget()
    this.loadWidget()
    this.widgets_list = []
    this.idbService.keys(keys => {
      keys.then(keysList => {
      })
    }, 'widget-service')
  }


  keys(next) {
    this.idbService.keys(next, 'wrapping keys')
  }



  loadWidget() {
    console.log('loading widgets')
    this.WidgetList = []
    this.idbService.keys((keys: Promise<any>) => {
      console.log('waiting for keys')
      keys.then(keyring => {
        console.log('got keys', keyring)
        keyring.forEach(element => {
          this.idbService.get(element, (item => {
            item.then(value => {
              console.log('value from db', value)
              const widget = new Widget(value)
              widget.id = element
              if (value.key) // è un widget
                this.WidgetList.push(widget)
              console.log('widgetList', this.WidgetList)
              this._widgetsList.next(this.WidgetList)
            })
          }))
        });
      })
    }, 'new initializeing')

  }
  async delete(id,next){
    await this.idbService.delete(id,next)
    this.loadWidget()
  }


  put(key: string, value: any, next: (v) => void) {
    this.idbService.put(key, value, next)
  }


  get(key: string, next: (v: Promise<any>) => void) {
    this.idbService.get(key, next)
  }

  async add(widget){
    console.log('adding ',widget)
     this.idbService.add(widget)
    this.loadWidget()
  }

  async connectToIDB() {
    this._db = await openDB('widgets', 3, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`updating db:${db}, oldVersion:${oldVersion},newVersion:${newVersion},transaction:${transaction}`)
        db.createObjectStore(this ? this.storeName : 'widgetsList', { keyPath: 'key', autoIncrement: true })

      },
      blocked() {
        console.log('blocked')
        // …
      },
      blocking() {
        console.log('blocking')
        // …
      },
      terminated() {
        console.log('terminated')
        // …
      },
    });
  }


}
