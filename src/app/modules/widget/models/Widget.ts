import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from './WidgetsTypes';

export class Widget  {
    constructor(args?: { service: EntityWidgetServiceInterface, entityKey: string, temporalWindow: number, counter: boolean, _order: number,_key?:number,note?:string,title?:string,description?:string }) {
        this.value = new BehaviorSubject(new Value({ value: 0, label: this.service ? this.service.entitityLabel : 'testing' }))
        this.load(args)
        this._key = this._key||new Date().getTime()

    }
    title: string;
    note: string
    description:string
   _key:number
    privatekey: string;
    archived?: boolean;
    getTitle(): Value {
        if (this.counter) {
            return new Value({ label: 'widget', value: 'negli' })

        }
        return new Value({ label: 'widget', value: 'totale' })
    }
    service: EntityWidgetServiceInterface
    private temporalWindow: number
    private entityKey: string
    private _order: number
    counter: boolean
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
            description:this.description||'',
            note:this.note||'',
            title:this.title||'',
            counter: this.counter,
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