import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';

export class Widget  {
    constructor(args?: { service: EntityWidgetServiceInterface, entityKey: string, temporalWindow: number, counter: boolean, _order: number,_key?:number }) {
        this.value = new BehaviorSubject(new Value({ value: 0, label: this.service ? this.service.entitityLabel : 'testing' }))
        this.load(args)
        this._key = this._key||new Date().getTime()

    }
    title: string;
   _key:number
    privatekey: string;
    quickActions?: import("../../item/models/QuickAction").QuickAction[];
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
    
    private counter: boolean
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

    serialize() {
        return {
            temporalWindow: this.temporalWindow || 0,
            entityKey: this.entityKey || '',
            key: this._key,
            counter: this.counter,
            _order: this._order || 0,
            widget: 'regular' // r'regular||by

        }
    }


    async calculateWidget() {
        this.service.items.subscribe()
    }
}