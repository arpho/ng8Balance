import { Operations } from '../models/Operations';

import * as firebase from 'firebase'
import * as functions from 'firebase/functions'
import { DateModel } from '../../user/models/birthDateModel';
export class CloudFunctions {
  toBeSynchronized = (operation: Operations,
    entity: string,
    data: firebase.database.DataSnapshot,
    context) => {
    const today = new DateModel()

    const ref = firebase.database().ref(`/toBeSynchronized/${context.params.uid}/`)
    const item = {
      entityKey: entity,
      operation,
      date:today.formatDate(),
      item_key: data.key
    }
    ref.push(item)
  }
}