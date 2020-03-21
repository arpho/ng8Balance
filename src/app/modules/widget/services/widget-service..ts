import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Schedule } from '../../../app.component'
import { promise } from 'protractor';
import { values } from 'd3';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private _dataChange: Subject<Schedule> = new Subject<Schedule>();
  private _db
  private _widgets: BehaviorSubject<Promise<any>> = new BehaviorSubject(new Promise((success, fail) => { success(undefined) }))
  public readonly widgets: Observable<any> = this._widgets.asObservable()
  storeName = 'widgetsList';

  constructor(public service: WidgetService) {
    // this.storage.keys().then(keys=>keys.forEach(k=>this.get(k).then(v=>console.log('value for ',k,v))))

    this.connectToIDB()
  }

  keys(next) {
    this.widgets.subscribe(db => {
      console.log('db', db)
      if (db.getAllKeys) {
        if(next){
        next(db.getAllKeys(this.storeName))
}        // return db.getAllKeys('widgetsList')
      }
    })

  }

  put(key: string, value: any, next: (v) => void) {
    this.widgets.subscribe((db: IDBPDatabase) => {

      if (db.put) {
        next(db.put(this.storeName, value, key))
      }
    })
  }

  get(key: string, next: (v: Promise<any>) => void) {
    this.widgets.subscribe((db: IDBPDatabase) => {
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
