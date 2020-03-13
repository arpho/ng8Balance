import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb'
import { Observable,Subject } from 'rxjs';
import {Schedule} from '../../../app.component'


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private _dataChange: Subject<Schedule> = new Subject<Schedule>();
private _db;

constructor(public service:WidgetService) {
  // this.storage.keys().then(keys=>keys.forEach(k=>this.get(k).then(v=>console.log('value for ',k,v))))
  
  this.connectToIDB()
}

  keys() {
     return this._db.getAllKeys('widgetsList')
  }

  set(key: string, value) {
    // this.storage.set(key, value)
  }

  get(key:string){
    // return this.storage.get(key)
  }

  async connectToIDB() {
    this._db = await openDB('widgets', 2, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`updating db:${db}, oldVersion:${oldVersion},newVersion:${newVersion},transaction:${transaction}`)
        db.createObjectStore('widgetsList')

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
        console.log('terminaated')
        // …
      },
    });
  }

  
}
