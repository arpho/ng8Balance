import { EntityWidgetServiceInterface } from './EntityWidgetServiceInterface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Value } from '../../item/models/value';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { WidgetTypes } from './WidgetsTypes';

export interface Widgetparams { service: EntityWidgetServiceInterface, serviceKey: string, entityKey: string, temporalWindow: number, counter: boolean, _order: number, _key?: number, note?: string, title?: string, description?: string }

export class Widget {
    _title: string;
    _note: string
    _description: string
    _key: number;
    _serviceKey: string
    _item: ItemModelInterface
    _entityKey: string //identify the entityKey
    _id: number
    _text: BehaviorSubject<string> = new BehaviorSubject('') // show the widget's text
    readonly text: Observable<string> = this._text.asObservable()
    _counter: boolean
    constructor(args?: Widgetparams) {
        this.load(args)
        this._key = this._key || new Date().getTime()

    }

    set item(item: ItemModelInterface) {
        this._item = item
        console.log('set item', item)
        this._entityKey = item.key
        this._text.next(`${item['widgetText']}`)
    }

    get item() {
        return this._item
    }

    set serviceKey(serviceKey: string) {
        this._serviceKey = serviceKey
    }

    get serviceKey() {
        return this._serviceKey
    }

    set counter(counter) {
        this._counter = counter
    }

    get counter() {
        return this._counter
    }

    set id(id: number) {
        this._id = id
    }

    get id() {
        return this._id
    }

    set title(title: string) {
        this._title = title
    }

    set entityKey(entityKey: string) {
        this._entityKey = entityKey
    }

    get entityKey() {
        return this._entityKey
    }

    get title() {
        return this._title
    }

    set note(note: string) {
        this._note = note
    }
    get note() {
        return this._note
    }
    set description(description: string) {
        this._description = description
    }

    get description() {
        return this._description
    }
    archived?: boolean;
    getTitle(): Value {
        if (this.counter) {
            return new Value({ label: 'widget', value: 'negli' })

        }
        return new Value({ label: 'widget', value: 'totale' })
    }
    service: EntityWidgetServiceInterface
    temporalWindow: number
    _order: number


    private value: BehaviorSubject<Value> // = new BehaviorSubject

    set order(value: number) {
        this._order = value
    }
    async getText() {
        let out: Promise<string>
        if (!this.counter) {
            return new Promise((resolve, reject) => {

                resolve(` totale spese ${this.item['widgetText']} negli ultimi ${this.temporalWindow} giorni:`)
            })
        }

    }

    filterFactory() {
        return () => {
            const out = (item: ItemModelInterface) => {
                const date = new Date()
                date.setDate(date.getDate() - this.temporalWindow)
                return item['purchaseDate'] >= date
            }
        }
    }


    get order() {
        return this._order
    }
    get key() {
        return this._key
    }

    load(args) {
        Object.assign(this, args)
        this.key = this.key || this._key
        return this
    }

    set key(key) {
        this._key = key
    }

    getEntityKey() {
        if (this._item) {
            return this._item.key
        }
        return this.entityKey

    }

    serialize() {
        return {
            temporalWindow: this.temporalWindow || 0,
            entityKey: this.getEntityKey() || this._entityKey,
            serviceKey: this._serviceKey || '',
            key: this._key,
            description: this._description || '',
            note: this._note || '',
            title: this._title || '',
            counter: this._counter,
            id: this._id || 0,
            _order: this._order || 0,
            widget: WidgetTypes.Regular // r'regular||by

        }
    }


    calculateWidget(key: string) {
        // this.service.items.subscribe()
        if (this.counter)
            return this.service.counterWidget(this.entityKey, this.service.items_list.filter(this.filterFactory()))
        return this.service.adderWidget(this.entityKey, this.service.items_list.filter(this.filterFactory()))
    }
}