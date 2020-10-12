import { DateModel } from '../../user/models/birthDateModel'
import { Operations } from './Operations'

export class TodoOPeration {
  itemKey: string
  date: DateModel
  signature: string
  sinchronizedBy: [string]
  operation: Operations
  constructor(op: { itemKey: string, date: string, operation: Operations, signature: string }) {
    Object.assign(this, op)
    this.date = new DateModel(op.date)

  }

  serialize() {
    return {
      'itemKey': this.itemKey,
      date: this.date.formatDate(),
      sinchronizedBy: this.sinchronizedBy,
      operation: this.operation,
      signature: this.signature

    }
  }
}