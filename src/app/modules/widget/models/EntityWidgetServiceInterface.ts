import { ItemServiceInterface } from '../../item/models/ItemServiceInterface';
import { ItemModelInterface } from '../../item/models/itemModelInterface';

/* interface to be implemented by the seevices that empower the widget */
export interface EntityWidgetServiceInterface extends ItemServiceInterface {
    entityKey: string //idntifier must be unique
    entitityLabel: string
    filterableField: string // is the field to be filtered for  in the main entities 
    counterWidget: (entityKey: string, entities: ItemModelInterface[]) => number
    adderWidget: (entityKey: string, entities: ItemModelInterface[]) => number
}