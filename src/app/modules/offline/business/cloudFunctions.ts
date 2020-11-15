import { Operations } from '../models/Operations';

import * as firebase from 'firebase'
import * as functions from 'firebase/functions'
export class CloudFunctions {
  toBeSynchronized = (operation: Operations,
    entity: string,
    data: firebase.database.DataSnapshot,
    context) => { }
}