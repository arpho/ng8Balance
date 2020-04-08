import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from './WidgetsTypes';

export interface Widgetparams{ service: EntityWidgetServiceInterface, entityKey: string, temporalWindow: number, counter: boolean, _order: number,_key?:number,note?:string,title?:string,description?:string }

export class Widget  {
    _title: string;
    _note: string
    _description:string
   _key:number;
   _id:number
   _counter: boolean
    constructor(args?: Widgetparams) {
        this.load(args)
        this._key = this._key||new Date().getTime()

    }

   set counter (counter){
       this._counter = counter
   }

   get counter (){
       return this._counter
   }

   set id ( id:number){
       this._id = id
   }

   get id (){
       return this._id
   }

   set title (title:string){
       this._title = title
   }
   get title (){
       return this._title
   }

   set note (note:string){
       this._note = note
   }
   get note (){
       return this._note
   }
   set description (description:string){
       this._description = description
   }

   get description (){
       return this._description
   }
    privatekey: string;
    archived?: boolean;
    getTitle(): Value {
        if (this.counter) {
            return new Value({ label: 'widget', value: 'negli' })

        }
        return new Value({ label: 'widget', value: 'totale' })
    }
    service: EntityWidgetServiceInterface
    temporalWindow: number
    entityKey: string
    _order: number

    
    private value: BehaviorSubject<Value> // = new BehaviorSubject

    set order(value: number) {
        this._order = value
    }

    filterFactory(){
        return  ()=>{
            const out = (item:ItemModelInterface)=>{
                const date = new Date()
                date.setDate(date.getDate()- this.temporalWindow)
                return item['purchaseDate'] >=  date
            }
        }
    }


    get order() {
        return this._order
    }
    get key(){
        return this._key
    }

    load(args) {
        Object.assign(this, args)
        this.key = this.key ||this._key
        return this
    }

    set key(key){
        this._key = key
    }

    serialize() {
        return {
            temporalWindow: this.temporalWindow || 0,
            entityKey: this.entityKey || '',
            key: this._key,
            description:this._description||'',
            note:this._note||'',
            title:this._title||'',
            counter: this._counter,
            id:this._id||0,
            _order: this._order || 0,
            widget: WidgetTypes.Regular // r'regular||by

        }
    }


     calculateWidget(key:string) {
        // this.service.items.subscribe()
        if(this.counter)
            return this.service.counterWidget(this.entityKey,this.service.items_list.filter(this.filterFactory()))
        return this.service.adderWidget(this.entityKey,this.service.items_list.filter(this.filterFactory()))
    }
}