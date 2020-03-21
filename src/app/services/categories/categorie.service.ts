import { Injectable } from '@angular/core';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import * as firebase from 'firebase';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { EntityWidgetServiceInterface } from 'src/app/modules/widget/models/EntityWidgetServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements ItemServiceInterface,EntityWidgetServiceInterface {
  public categoriesListRef: firebase.database.Reference;
   _items: BehaviorSubject<Array<CategoryModel>> = new BehaviorSubject([])
   readonly items: Observable<Array<CategoryModel>> = this._items.asObservable()
   items_list: Array<CategoryModel> = []
  initializeCategory(cat) {
    const Cat = new CategoryModel(cat.key).initialize(cat)
    if (Cat.fatherKey) {
      this.getItem(Cat.fatherKey).on('value', father => {
        const FatherCategory = this.initializeCategory(father.val())
        Cat.father = FatherCategory
      })
    }
    return Cat
  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.categoriesListRef = firebase.database().ref(`/categorie/${user.uid}/`); this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const cat = this.initializeCategory(snap.val())
            cat.key = cat.key || snap.key // inizialmente il campo key non  veniva serializzato
            this.items_list.push(cat)
          }
          );
          this._items.next(this.items_list)
        });
      }
    });


  }
  entityKey="categories";
  entitityLabel="Categoria";
  counterWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  adderWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;


  getDummyItem() {

    return new CategoryModel();
  }




  createItem(item: CategoryModel) {
    return this.categoriesListRef.push(item.serialize());

  }

  getEntitiesList(): firebase.database.Reference {
    return this.categoriesListRef;
  }


  getItem(prId: string): firebase.database.Reference {
    return this.categoriesListRef.child(prId);
  }

  updateItem(item: ItemModelInterface) {
    return this.categoriesListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.categoriesListRef.child(key).remove();
  }

}
