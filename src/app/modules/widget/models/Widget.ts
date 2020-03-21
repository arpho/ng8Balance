import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';

export class Widget {
    constructor(args: { service: EntityWidgetServiceInterface, entityKey: string, period: number, counter: boolean }) {
        this.value = new BehaviorSubject(new Value({ value: 0, label: this.service.entitityLabel }))
        Object.assign(this, args)

    }
    private service: EntityWidgetServiceInterface
    private period: number
    private entityKey: string
    private counter: boolean
    private value: BehaviorSubject<Value> // = new BehaviorSubject

    serialize() {
        return {
            period: this.period || 0,
            entityKey: this.entityKey || '',
            counter: this.counter,
            widget: 'regular' // r'regular||by

        }
    }


    async calculateWidget() {
        this.service.items.subscribe()
    }
}