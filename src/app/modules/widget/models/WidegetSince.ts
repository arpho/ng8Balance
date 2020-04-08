import { Widget, Widgetparams } from './Widget';
import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from './WidgetsTypes';

export interface WidgetSinceParams extends Widgetparams{
    sinceDate:string
}

export class WidgetSince extends Widget{

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
            widget: WidgetTypes.Since // r'regular||by

        }
    }
}