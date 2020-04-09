import { Injectable } from '@angular/core';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { PaymentsModel } from 'src/app/models/paymentModel';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { EntityWidgetServiceInterface } from 'src/app/modules/widget/models/EntityWidgetServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService implements ItemServiceInterface,EntityWidgetServiceInterface {

  public paymentsListRef: firebase.database.Reference;
   _items:BehaviorSubject<Array<PaymentsModel>> = new BehaviorSubject([])
   readonly items:Observable<Array<PaymentsModel>> = this._items.asObservable()
   items_list:Array<PaymentsModel> = []
  getDummyItem() {
    return new PaymentsModel();

  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.paymentsListRef = firebase.database().ref(`/pagamenti/${user.uid}/`);
        this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const payment =  new PaymentsModel().initialize(snap.val())
            this.items_list.push(payment );
          });
        this._items.next(this.items_list)
        });
      }
    });
  }
  key=' Pagamenti';
  entitityLabel='fornitori'
  filterableField: string;
  counterWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  adderWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;

  getEntitiesList(): firebase.database.Reference {
    return this.paymentsListRef;
  }


  getItem(prId: string): firebase.database.Reference {
    return this.paymentsListRef.child(prId);
  }

  createItem(item: ItemModelInterface) {
    return this.paymentsListRef.push(item.serialize());

  }

  updateItem(item: ItemModelInterface) {
    return this.paymentsListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.paymentsListRef.child(key).remove();
  }
}
