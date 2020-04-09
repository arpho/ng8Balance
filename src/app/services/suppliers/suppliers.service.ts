import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SupplierModel } from '../../models/supplierModel';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntityWidgetServiceInterface } from 'src/app/modules/widget/models/EntityWidgetServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService implements ItemServiceInterface, EntityWidgetServiceInterface {
  public suppliersListRef: firebase.database.Reference;
  _items: BehaviorSubject<Array<SupplierModel>> = new BehaviorSubject([])
  readonly items: Observable<Array<SupplierModel>> = this._items.asObservable()
  items_list: Array<SupplierModel> = []
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.suppliersListRef = firebase.database().ref(`/fornitori/${user.uid}/`);
        this.getEntitiesList().on('value', eventSuppliersListSnapshot => {
          this.items_list = [];
          eventSuppliersListSnapshot.forEach(snap => {
            const supplier = new SupplierModel(undefined, snap.key).initialize(snap.val())
            supplier.key = snap.key // alcuni item non hanno il campo key
            this.items_list.push(supplier);
            if (supplier.key === '') {
            }
          });
          this._items.next(this.items_list)
        });
      }
    });
  }
  key = 'fornitori';
  entityLabel = 'Fornitori'
  counterWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  adderWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;


  getDummyItem() {

    return new SupplierModel();
  }

  createItem(item: ItemModelInterface) {
    return this.suppliersListRef.push(item.serialize());

  }

  getEntitiesList(): firebase.database.Reference {
    return this.suppliersListRef;
  }


  getItem(prId: string): firebase.database.Reference {

    return (this.suppliersListRef && prId) ? this.suppliersListRef.child(prId) : undefined;
  }

  updateItem(item: SupplierModel) {
    return this.suppliersListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {

    return (key) ? this.suppliersListRef.child(key).remove() : undefined;
  }

}
