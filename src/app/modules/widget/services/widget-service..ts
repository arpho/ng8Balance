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
  Keys:string[]
  public readonly _widgetsList: BehaviorSubject<Array<Widget>> = new BehaviorSubject([])
  widgetsList:Observable<Array<Widget>> = this._widgetsList.asObservable()
  WidgetList:Widget[]  = []

  private _db

  // _items: BehaviorSubject<Array<ShoppingKartModel>> = new BehaviorSubject([])
  public readonly _widgets: BehaviorSubject<Array<Widget>> = new BehaviorSubject([])
  public readonly Widgets: Observable<any> = this._widgets.asObservable()
  storeName = 'widgetsList';
  widgets_list:Array<Widget>

  constructor(public service: WidgetService,public idbService:IDBWidgetServiceService) {

    this.connectToIDB()
    // this.initializeWidget()
     this.initializeWidget2()
    this.widgets_list =[]
    this.idbService.keys(keys=>{
      keys.then(keysList=>{
      })
    },'widget-service')
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
      if(db.delete){
        db.delete(key,next).then(v=>{
          console.log('donno',v)
        })
      }
    })
  }

  initializeWidget2(){
    this.WidgetList = []
    this.idbService.keys((keys:Promise<any>)=>{
      keys.then(keyring=>{
    keyring.forEach(element => { 
    this.idbService.get(element,(item=>{
      item.then(value=>{
        const widget = new Widget(value)
        if(value.key) // è un widget
        this.WidgetList.push(widget)
        this._widgetsList.next(this.WidgetList)
      })
    }))
    });
    })
    },'new initializeing')
    
  }

  private initializeWidget(){
    this.keys((keys: Promise<any>) => {
      keys.then(Keys => {
        // console.log('got keys',Keys)
        this.Keys = Keys

        this.widgets_list = []
        Keys.forEach(element => {
          this.get(element,((item)=>{
            
              item.then((v)=>{
                // console.log('got',element,v)
                if(v.key){
                  // console.log(`${element} is a widget`)
                const widget = new Widget(v)
               // console.log('widget',widget)
               this.widgets_list.push(widget)
               // console.log('widgets list',this.widgets_list)
               this._widgets.next(this.widgets_list)
              }
                
              })
            
          }))
          
        });
      })
    })

  }

  put(key: string, value: any, next: (v) => void) {
    this.idbService.put(key,value,next)
  }


  get(key: string, next: (v: Promise<any>) => void) {
    this.idbService.get(key,next)
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
