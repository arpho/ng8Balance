import { BehaviorSubject, Observable } from 'rxjs'
import { PersistenceService } from '../services/persistence.service'

export class Fetchitems{
     
  _items: BehaviorSubject<Array<{}>> = new BehaviorSubject([])
  readonly items: Observable<Array<{}>> = this._items.asObservable()
  constructor(public persistence:PersistenceService){
      
  }

  async FetchAllItems(entityKey:string,cb?){
    this._items.subscribe(cb)
    const items= []
    const a = async (key)=>{
      const item = await this.persistence.getItem(key).toPromise()
      items.push(item)
      this._items.next(items)
    }
    this.persistence.keys().subscribe({
        next:a,
      complete:()=>{
        console.log('fetching completed')
      }
    
    })
  }
}