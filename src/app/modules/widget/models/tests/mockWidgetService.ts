import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { EntityWidgetServiceInterface } from '../EntityWidgetServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { WidgetOperation } from '../WidgetsTypes';

export class WidgetServiceMocker implements ItemServiceInterface, EntityWidgetServiceInterface {
    entityKey: string;
    entitityLabel: string;
    filterableField: string;
    counterWidget: (entityKey: string, entities: ItemModelInterface[]) => WidgetOperation.Counter;
    adderWidget: (entityKey: string, entities: ItemModelInterface[]) => WidgetOperation.Adder;
    categoriesService?: ItemServiceInterface;
    suppliersService?: ItemServiceInterface;
    paymentsService?: ItemServiceInterface;
    suppliersListRef?: any;
    _items: import("rxjs").BehaviorSubject<import("../../../item/models/itemModelInterface").ItemModelInterface[]>;
    items_list: import("../../../item/models/itemModelInterface").ItemModelInterface[];
    items: import("rxjs").Observable<import("../../../item/models/itemModelInterface").ItemModelInterface[]>;
    getItem(key: string): import("firebase").database.Reference {
        throw new Error("Method not implemented.");
    }
    updateItem(item: ItemModelInterface) {
        throw new Error("Method not implemented.");
    }
    deleteItem(key: string) {
        throw new Error("Method not implemented.");
    }
    getDummyItem(): ItemModelInterface {
        throw new Error("Method not implemented.");
    }
    createItem(item: ItemModelInterface): import("firebase").database.ThenableReference {
        throw new Error("Method not implemented.");
    }
    getEntitiesList(): import("firebase").database.Reference {
        throw new Error("Method not implemented.");
    }

    

}
