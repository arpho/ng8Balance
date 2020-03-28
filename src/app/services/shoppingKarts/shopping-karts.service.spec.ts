import { TestBed } from '@angular/core/testing';

import { ShoppingKartsService } from './shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { CategoryModel } from 'src/app/models/CategoryModel';

describe('ShoppingKartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingKartsService = TestBed.get(ShoppingKartsService);
    expect(service).toBeTruthy();
  });
  it('should trasform karts list in items list',()=>{
    const service: ShoppingKartsService = TestBed.get(ShoppingKartsService);
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      note: 'note',
      key: 'zxcvbnm'
  }
  const kart = new ShoppingKartModel()
kart.build(kartdata)
const a = new PurchaseModel({ key: 'a', prezzo: 1, categorieId: ['a', 'b', 'c'], descrizione: 'a' }).initialize({ key: 'a', prezzo: 1, categorieId: ['a', 'b', 'c'], descrizione: 'a' })
const b = new PurchaseModel({ key: 'b', prezzo: 2, categorieId: ['a', 'b', 'c'], descrizione: 'b' }).initialize({ key: 'b', prezzo: 2, categorieId: ['a', 'b', 'c'], descrizione: 'b' })
const inizializeCategory = (cat: CategoryModel, categoriesServiceMocker: any) => cat.initialize(categoriesServiceMocker.filter((Cat) => Cat.key == cat.key)[0])
const catService = [{ key: 'a', title: 'A' }, { key: 'b', title: 'B' }, { key: 'c', title: 'C' }]
const initializeCategoryWrapper = (cat: CategoryModel) => inizializeCategory(cat, catService)
a.categorie =  a.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
b.categorie =  b.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
kart.addItem(b)
kart.addItem(a)
expect(service.itemsKartMapper([kart]).length).toBe(2)
  })
});
