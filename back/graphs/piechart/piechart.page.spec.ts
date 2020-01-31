// tslint:disable:semicolon
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartPage } from './piechart.page';
import { DatePipe } from '@angular/common';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { MockCategoriesService } from 'src/app/models/mockers/mockCategoriesService';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemFilterOPtions } from 'src/app/modules/item/models/ItemFIlterOptions';

describe('PiechartPage', () => {
  let component: PiechartPage;
  let fixture: ComponentFixture<PiechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.entities.length).toBe(3);

  });
  // tslint:disable-next-line: quotemark
  it("categories'functions work with one kart of one purchase", () => {
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm'
    };
    const kart = new ShoppingKartModel(kartdata);
    const testPurchase = {
      barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const purchaseA = new PurchaseModel(testPurchase, // new MockCategoriesService()
    );
    purchaseA.load(); // load categories in purchaseA
    kart.addItem(purchaseA);
    // const categoriesList = kart.items.reduce(component.expandPurchases, []);
  });




});
describe('categoriesMapper', () => {
  let component: PiechartPage;
  let fixture: ComponentFixture<PiechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('developing functions for one kart', () => {
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm'
    };
    const kart = new ShoppingKartModel(kartdata);
    const testPurchase0 = {
      barcode: '123456', key: '0', descrizione: 'purchase A', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const testPurchase1 = {
      // tslint:disable-next-line: quotemark
      barcode: '123457', key: '1', descrizione: "purchaseB", picture: 'picture', prezzo: 126.5,
      categorieId: ['c', 'D', 'e']
    };
    const inizializeCategory = (cat: CategoryModel, categoriesServiceMocker: any) => cat.initialize(categoriesServiceMocker.filter((Cat) => Cat.key == cat.key)[0])
    const catService = [{ key: 'a', title: 'A' }, { key: 'b', title: 'B' }, { key: 'c', title: 'C' }, { key: 'D', title: 'D' }, { key: 'e', title: 'E' }]
    const initializeCategoryWrapper = (cat: CategoryModel) => inizializeCategory(cat, catService)
    const purchaseA = new PurchaseModel(testPurchase0).initialize(testPurchase0)
    purchaseA.categorie = purchaseA.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
    const purchaseB = new PurchaseModel(testPurchase1).initialize(testPurchase1);
    purchaseB.categorie = purchaseB.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
    kart.addItem(purchaseA);
    kart.addItem(purchaseB)
    const kartsList = [kart]
    const karts2PurchaseListMapper = (Kart: ShoppingKartModel) => Kart.items
    const purchasesList = kartsList.map(karts2PurchaseListMapper)[0] /* elimino l'array esterno nel 
    caso generale devo ridurre lo array con flattener*/
    expect(purchasesList.length).toBe(2)
    const purchaseModel2CategoriesListMapper = (purchase: PurchaseModel) => ({ categorie: purchase.categorie, prezzo: purchase.prezzo })
    const categorieslist = purchasesList.map(purchaseModel2CategoriesListMapper)
    expect(categorieslist.length).toBe(2)
    expect(categorieslist[0].categorie.length).toBe(3)
    expect(categorieslist[0].prezzo).toBe(125.5)
    expect(categorieslist[1].prezzo).toBe(126.5)
    const expandCategoriesList2categoryPriceObject = (element: { categorie: Array<CategoryModel>, prezzo: number }) =>
      element.categorie.reduce((acc, cv) => {
        acc.push({ categoria: cv, prezzo: element.prezzo })
        return acc
      }, [])

    const categoriaPrezzo = categorieslist.map(expandCategoriesList2categoryPriceObject)
    expect(categoriaPrezzo.length).toBe(2)
    expect(categoriaPrezzo[0][0].prezzo).toBe(125.5)
    expect(categoriaPrezzo[0][0].categoria).toEqual(jasmine.any(CategoryModel))
    expect(categoriaPrezzo[1][0].prezzo).toBe(126.5)
    const flattener = (acc: any, el: any) => {
      acc = [...acc, ...el]
      return acc

    }
    const categoriaPrezzoList = categoriaPrezzo.reduce(flattener, [])
    expect(categoriaPrezzoList.length).toBe(6)
    const categoryPriceReducer = (acc: {}, currentValue: { categoria: CategoryModel, prezzo: number }) => {
      acc[currentValue.categoria.title] = acc[currentValue.categoria.title] + currentValue.prezzo || currentValue.prezzo
      return acc
    }
    const reducedCategoryprice = categoriaPrezzoList.reduce(categoryPriceReducer, {})
    expect(Object.entries(reducedCategoryprice).length).toBe(5)
    expect(reducedCategoryprice.A).toBe(125.5)
    expect(reducedCategoryprice.B).toBe(125.5)
    expect(reducedCategoryprice.D).toBe(126.5)
    expect(reducedCategoryprice.E).toBe(126.5)
    expect(reducedCategoryprice.C).toBe(252)
  })

  // tslint:disable-next-line: quotemark
  it("two karts", () => {
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm'
    };
    const kart = new ShoppingKartModel(kartdata);
    const inizializeCategory = (cat: CategoryModel, categoriesServiceMocker: any) => cat.initialize(categoriesServiceMocker.filter((Cat) => Cat.key == cat.key)[0])
    const catService = [{ key: 'a', title: 'A' }, { key: 'b', title: 'B' }, { key: 'c', title: 'C' },{key:'D',title:'deleted'},{key:'e',title:'E'}]
    const initializeCategoryWrapper = (cat: CategoryModel) => inizializeCategory(cat, catService)
    const testPurchase0 = {
      barcode: '123456', key: '0', descrizione: 'purchase A', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const testPurchase1 = {
      // tslint:disable-next-line: quotemark
      barcode: '123457', key: '1', descrizione: "purchaseB", picture: 'picture', prezzo: 126.5,
      categorieId: ['c', 'D', 'e']
    };
    const purchaseA = new PurchaseModel(testPurchase0, //new MockCategoriesService()
    );
    // load categories in purchaseA
    purchaseA.categorie = purchaseA.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
    const purchaseB = new PurchaseModel(testPurchase1);
    purchaseB.categorie = purchaseB.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
    purchaseB.load(); // load categories in purchaseA
    kart.addItem(purchaseA);
    kart.addItem(purchaseB)
    const kartsList = [kart, kart]
    const karts2PurchaseListMapper = (Kart: ShoppingKartModel) => Kart.items
    const purchasesLists = kartsList.map(karts2PurchaseListMapper) // lista di liste di acquisti
    expect(purchasesLists.length).toBe(2)
    const flattener = (acc: any, el: any) => {
      acc = [...acc, ...el]
      return acc

    }
    const reducedPurchasesLists = purchasesLists.reduce(flattener, [])
    expect(reducedPurchasesLists.length).toBe(4)
    const purchaseModel2CategoriesListMapper = (purchase: PurchaseModel) => ({ categorie: purchase.categorie, prezzo: purchase.prezzo })
    const categoriesPriceLists = reducedPurchasesLists.map(purchaseModel2CategoriesListMapper) //** */
    expect(categoriesPriceLists.length).toBe(4)
    const expandCategoriesList2categoryPriceObject = (element: { categorie: Array<CategoryModel>, prezzo: number }) =>
      element.categorie.reduce((acc, cv) => {
        acc.push({ categoria: cv, prezzo: element.prezzo })
        return acc
      }, [])
    const categoriaPrezzo = categoriesPriceLists.map(expandCategoriesList2categoryPriceObject)// **/
    expect(categoriaPrezzo.length).toBe(4)
    const reducedCategoriaPrezzo = categoriaPrezzo.reduce(flattener, [])// **/
    expect(reducedCategoriaPrezzo.length).toBe(12)
    const categoryPriceReducer = (acc: {}, currentValue: { categoria: CategoryModel, prezzo: number }) => {
      acc[currentValue.categoria.title] = acc[currentValue.categoria.title] + currentValue.prezzo || currentValue.prezzo
      return acc
    }
    const reducedCategoryPrice = reducedCategoriaPrezzo.reduce(categoryPriceReducer, {}) 
    expect(Object.entries(reducedCategoryPrice).length).toBe(5)
    expect(reducedCategoryPrice.A).toBe(251)
    expect(reducedCategoryPrice.B).toBe(251)
    expect(reducedCategoryPrice.C).toBe(504)
    expect(reducedCategoryPrice.deleted).toBe(253)
    expect(reducedCategoryPrice.E).toBe(253)
    const c = component.transformers.categories(kartsList)
    expect(Object.entries(c).length).toBe(5)
    expect(c.A).toBe(251)
    expect(c.B).toBe(251)
    expect(c.C).toBe(504)
    expect(c.deleted).toBe(253)
    expect(c.E).toBe(253)

  })

})
describe('transformers functions', () => {
  let component: PiechartPage;
  let fixture: ComponentFixture<PiechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm'
    };
    const kart = new ShoppingKartModel(kartdata);
    const testPurchase0 = {
      barcode: '123456', key: '0', descrizione: 'purchase A', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const testPurchase1 = {
      // tslint:disable-next-line: quotemark
      barcode: '123457', key: '1', descrizione: "purchaseB", picture: 'picture', prezzo: 126.5,
      categorieId: ['c', 'D', 'e']
    };
    const purchaseA = new PurchaseModel(testPurchase0,// new MockCategoriesService()
    );
    purchaseA.load(); // load categories in purchaseA
    const purchaseB = new PurchaseModel(testPurchase1,// new MockCategoriesService()
    );
    purchaseB.load(); // load categories in purchaseA
    kart.addItem(purchaseA);
    kart.addItem(purchaseB)
    const kartsList = [kart, kart]
  });
  it('suppliers should work', () => {

  })

})
