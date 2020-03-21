import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';

export class Widget implements ItemModelInterface {
    constructor(args?: { service: EntityWidgetServiceInterface, entityKey: string, period: number, counter: boolean, _order: number }) {
        this.value = new BehaviorSubject(new Value({ value: 0, label: this.service ? this.service.entitityLabel : 'testing' }))
        this.load(args)

    }
    title: string;
    note?: string;
    key: string;
    quickActions?: import("../../item/models/QuickAction").QuickAction[];
    archived?: boolean;
    getTitle(): Value {
        if (this.counter) {
            return new Value({ label: 'widget', value: 'negli' })

        }
        return new Value({ label: 'widget', value: 'totale' })
    }
    getCountingText(): string {
        throw new Error("Method not implemented.");
    }
    getNote(): Value {
        throw new Error("Method not implemented.");
    }
    archiveItem?(b: boolean) {
        throw new Error("Method not implemented.");
    }
    isArchivable?(): boolean {
        throw new Error("Method not implemented.");
    }
    getValue2(): Value {
        throw new Error("Method not implemented.");
    }
    getValue3(): Value {
        throw new Error("Method not implemented.");
    }
    getValue4(): Value {
        throw new Error("Method not implemented.");
    }
    getEditPopup(item?: ItemModelInterface, serservice?: import("../../item/models/ItemServiceInterface").ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    getAggregate(): Value {
        throw new Error("Method not implemented.");
    }
    hasQuickActions?(): boolean {
        throw new Error("Method not implemented.");
    }
    getElement(): { element: string; genere: import("../../item/models/itemModelInterface").Genere; } {
        throw new Error("Method not implemented.");
    }
    service: EntityWidgetServiceInterface
    private period: number
    private entityKey: string
    private _order: number
    private counter: boolean
    private value: BehaviorSubject<Value> // = new BehaviorSubject

    set order(value: number) {
        this._order = value
    }

    get order() {
        return this._order
    }

    load(args) {
        Object.assign(this, args)
        return this
    }

    serialize() {
        return {
            period: this.period || 0,
            entityKey: this.entityKey || '',
            counter: this.counter,
            _order: this._order || 0,
            widget: 'regular' // r'regular||by

        }
    }


    async calculateWidget() {
        this.service.items.subscribe()
    }
}