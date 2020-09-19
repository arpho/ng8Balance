import { Injectable } from '@angular/core';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private storage: StorageMap) {
  }

  getItem(key: string, schema?: JSONSchema) {
    return this.storage.get(key, schema)
  }


  setItem(key: string, data: any, schema?: JSONSchema) {
    return this.storage.set(key, data, schema)
  }

  has(key: string) {
    return this.storage.has(key)
  }

  deleteItem(key: string) {
    return this.storage.delete(key)
  }

  size() {
    return this.storage.size
  }

  keys() {
    return this.storage.keys()
  }

  clear(){
    return this.storage.clear()
  }

}
