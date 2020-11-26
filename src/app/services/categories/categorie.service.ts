import { Injectable } from '@angular/core';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import * as firebase from 'firebase';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { EntityWidgetServiceInterface } from 'src/app/modules/widget/models/EntityWidgetServiceInterface';
import { PricedCategory } from 'src/app/models/pricedCategory';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { values } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements ItemServiceInterface, EntityWidgetServiceInterface {
  public readonly key = 'categories'
  public categoriesListRef: firebase.database.Reference;
  _items: BehaviorSubject<Array<CategoryModel>> = new BehaviorSubject([])
  readonly items: Observable<Array<CategoryModel>> = this._items.asObservable()
  items_list: Array<CategoryModel> = []
  initializeCategory(cat) {
    if (cat && cat.key) {
      var Cat = new CategoryModel(cat.key).initialize(cat)
      if (Cat.fatherKey) {
        this.getItem(Cat.fatherKey).on('value', father => {
          const FatherCategory = this.initializeCategory(father.val())
          Cat.father = FatherCategory
        })
      }
    }
    return Cat
  }


  counterWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  adderWidget: (entityKey: string, entities: ItemModelInterface[]) => number;
  filterableField = 'purchaseDate' // we filter shoppingkart's entities by purchase date
  entityLabel = "Categoria";


  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;


  getDummyItem() {

    return new CategoryModel();
  }



  /**mappa ad ogni ogetto {categorie:CategoriModel[],price:number} con [{category:CategoryModel,price:number}]  */
  blowupCategories = (item: { categorie: CategoryModel[], price: number }) => item.categorie.map((cat: CategoryModel) => {
    return new PricedCategory({ category: cat, price: item.price })
  })

  /**
  * trasforma una lista di carrelli in una lista di items
  */
  ItemskartMapper2 = (pv: PurchaseModel[], cv: ShoppingKartModel) => [...pv, ...cv.items]



  itemsMapper2 = (item: PurchaseModel) => {
    /**
     * 
     */
    return { categorie: item.categorie, price: item.prezzo }
  }
  flattener = (pv, cv) => {
    return [...pv, ...cv]
  }

  blowCategoriesUp = (karts: ShoppingKartModel[]) => {
    return karts.reduce(this.ItemskartMapper2, []).map(this.itemsMapper2).map(this.blowupCategories).reduce(this.flattener)
  }


  async createItem(item: CategoryModel) {
    var Category
    const category = await this.categoriesListRef.push(item.serialize())
    category.on('value', (cat) => {
      Category = this.initializeCategory(cat.val())
      Category.key = cat.key
      this.updateItem(Category)
    })
    return Category;

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

  constructor() {
    this.instatiateItem = (args: {}) => {
      return this.initializeCategory(args)
    }
    this.counterWidget = (entityKey: string, entities: ShoppingKartModel[]) => {
      return this.blowCategoriesUp(entities).filter((item: PricedCategory) => item.category.key == entityKey).map((item: PricedCategory) => 1).reduce((pv, cv) => { return pv += cv }, 0)
    }
    this.adderWidget = (entityKey: string, entities: ShoppingKartModel[]) => {
      return this.blowCategoriesUp(entities).filter((item: PricedCategory) => item.category.key == entityKey).map((item: PricedCategory) => item.price).reduce((pv, cv) => { return pv += cv }, 0);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.categoriesListRef = firebase.database().ref(`/categorie/${user.uid}/`);
        this.categoriesListRef.on('value', eventCategoriesListSnapshot => {
          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const cat = this.initializeCategory(snap.val())
            if (cat && cat.key === undefined) {
              cat.key = snap.key
            }
            this.items_list.push(cat)
          }
          );
          this._items.next(this.items_list)
        });
      }
    });


  }
  instatiateItem: (args: {}) => ItemModelInterface;

}
