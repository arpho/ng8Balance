import { Injectable } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  keys() {
    return this.storage.keys()
  }

  set(key: string, value) {
    this.storage.set(key, value)
  }

  get(key:string){
    return this.storage.get(key)
  }

  constructor(public storage: Storage) {
    this.storage.keys().then(keys=>keys.forEach(k=>this.get(k).then(v=>console.log('value for ',k,v))))
  }
}
