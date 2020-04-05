import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IDBWidgetServiceService {
  storeName= 'widgetsList'
  private _db
  public readonly db: BehaviorSubject<IDBPDatabase> = new BehaviorSubject(undefined)

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
     this.db.next(this._db)
  }

async initializeWidget(){


}

delete(id,next){

  this.db.subscribe((db:IDBPDatabase)=>{
    console.log('deleting',id)
    db.delete(this.storeName,id)
  })
}

  put(key: string, value: any, next: (v) => void) {
    this.db.subscribe((db: IDBPDatabase) => {

      if (db.put) {
        console.log('putting',value)
        next(db.put(this.storeName, value))
      }
    })
  }


  get(key: string, next: (v: Promise<any>) => void) {
    this.db.subscribe((db: IDBPDatabase) => {
      if (db.get) {
        next(db.get(this.storeName, key))
      }
    })
  }


  keys(next,who) {
    this.db.subscribe(db => {
      if (db) {
        if(next){
        next(db.getAllKeys(this.storeName))
}        // return db.getAllKeys('widgetsList')
      }
    })

  }

  constructor() {
    this.connectToIDB()


   }
}
