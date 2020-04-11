import { Widget, Widgetparams } from './Widget';
import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from './WidgetsTypes';
import { DateModel } from '../../user/models/birthDateModel';

export interface WidgetSinceParams extends Widgetparams{
    sinceDate:string
}

export class WidgetSince extends Widget{
MySinceDate: DateModel
sinceDate:string // campo data serializzato dal db
    constructor(args?: WidgetSinceParams){
        super(args)
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

    load(args){
        Object.assign(this,args)
        this.MySinceDate = new DateModel(this.sinceDate)
        return this
    }


    getText() {
        if (!this.counter) {
            return ` totale spese ${this.item['widgetText']} dal ${this.MySinceDate.serialize()}:`
        }
        return ` totale spese ${this.item['widgetText']} negli ultimi ${this.MySinceDate.serialize()}:`

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
            _order: this.order || 0,
            serviceKey:this.serviceKey||'',
            sincedate:this.MySinceDate.serialize(),
            widget: WidgetTypes.Since // r'regular||by

        }
    }
}