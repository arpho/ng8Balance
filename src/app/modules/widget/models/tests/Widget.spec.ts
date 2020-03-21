import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Widget } from '../Widget';
import { stringify } from 'querystring';
describe("testing Widget", () => {
    let widget;
    beforeEach(() => {
        widget = new Widget({ service: undefined, entityKey: 'testKey', period: 1, counter: true, _order: 0 })

    })
    it('widget should instantiate', () => {
        expect(widget).toBeTruthy()
    })
    it('widget should serialize correctly', () => {
        const serialized = widget.serialize()
        expect(serialized._order).toBe(0)
        expect(serialized.entityKey).toBe('testKey')
        expect(serialized.period).toBe(1)
        expect(serialized.counter).toBeTruthy()
    })
    it('widget should load',()=>{
        widget = new Widget().load({entityKey:'testKey2',_order:2,period:2})
        const serialized = widget.serialize()
        expect(serialized._order).toBe(2)
        expect(serialized.entityKey).toBe('testKey2')
        expect(serialized.period).toBe(2)
        expect(serialized.counter).toBeFalsy()
    })
    it('order should be setted and getted',()=>{
        expect(widget.order).toBe(0)
        widget.order = 3
        expect(widget.order).toBe(3)
    })
})