import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IDBWidgetServiceService {
  storeName = 'widgetsList'
  dbName = 'widgets'
  private _db: IDBPDatabase
  public readonly db: BehaviorSubject<IDBPDatabase> = new BehaviorSubject(undefined)


  constructor() {
    this.connectToIDB()


  }



  async connectToIDB() {
    this._db = await openDB('widgets', 3, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`updating db:${db}, oldVersion:${oldVersion},newVersion:${newVersion},transaction:${transaction}`)
        if (this && this.storeName) {
          db.createObjectStore(this.storeName, { keyPath: 'key', })
        }

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

  async initializeWidget() {


  }
  async add(item) {
    console.log('adding widget', item)
    const db = await this.db.subscribe((db: IDBPDatabase) => {
      if (db) {
        console.log('creating widget', item)
        db.add(this.storeName, item, item.key).catch((err) => { console.log('error on asdding', err) })
      }
    })


  }

  delete(id, next) {

    this.db.subscribe((db: IDBPDatabase) => {
      db.delete(this.storeName, id)
    })
  }

  put(key: string, value: any, next: (v) => void) {
    this.db.subscribe((db: IDBPDatabase) => {

      if (db.put) {
        next(db.put(this.storeName, value, key))
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


  keys(next, who) {
    this.db.subscribe(db => {
      if (db) {
        if (next) {
          next(db.getAllKeys(this.storeName))
        }        // return db.getAllKeys('widgetsList')
      }
    })

  }

}
