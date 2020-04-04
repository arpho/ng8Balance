import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Schedule } from '../../../app.component'
import { promise } from 'protractor';
import { values } from 'd3';
import { Widget } from '../models/Widget';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  Keys
  private _dataChange: Subject<Schedule> = new Subject<Schedule>();
  private _db

  // _items: BehaviorSubject<Array<ShoppingKartModel>> = new BehaviorSubject([])
  public readonly _widgets: BehaviorSubject<Array<Widget>> = new BehaviorSubject([])
  public readonly Widgets: Observable<any> = this._widgets.asObservable()
  storeName = 'widgetsList';
  widgets_list:Widget[]

  constructor(public service: WidgetService) {

    this.connectToIDB()
    this.initializeWidget()
    this.widgets_list =[]
  }

  keys(next) {
    this.Widgets.subscribe(db => {
      if (db.getAllKeys) {
        if(next){
        next(db.getAllKeys(this.storeName))
}        // return db.getAllKeys('widgetsList')
      }
    })

  }
  delete(key,next){
    this.Widgets.subscribe((db:IDBPDatabase)=>{
      console.log('subscription',db)
      if(db.delete){
        db.delete(key,next).then(v=>{
          console.log('donno',v)
        })
      }
    })
  }

  private initializeWidget(){
    this.keys((keys: Promise<any>) => {
      this.Keys = keys
      keys
      keys.then(Keys => {
        console.log('keys in service', Keys)
        Keys.forEach(element => {
          this.get(element,((item)=>{
            item.then((v)=>{
              item.then((v)=>{
                console.log(element,v)
                if(v.key){
                const widget = new Widget(v)
               console.log('widget',widget)
               this.widgets_list.push(widget)
               console.log('widgets list',this.widgets_list)
               this._widgets.next(this.widgets_list)
              }
                
              })
            })
          }))
          
        });
      })
    })

  }

  put(key: string, value: any, next: (v) => void) {
    this.Widgets.subscribe((db: IDBPDatabase) => {

      if (db.put) {
        next(db.put(this.storeName, value, key))
      }
    })
  }


  get(key: string, next: (v: Promise<any>) => void) {
    this.Widgets.subscribe((db: IDBPDatabase) => {
      if (db.get) {
        next(db.get(this.storeName, key))
      }
    })
  }

  async connectToIDB() {
    this._db = await openDB('widgets', 2.7, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`updating db:${db}, oldVersion:${oldVersion},newVersion:${newVersion},transaction:${transaction}`)
        db.createObjectStore(this?this.storeName:'widgetsList', { keyPath: 'id', autoIncrement: true })

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
    this._widgets.next(this._db)
  }


}
