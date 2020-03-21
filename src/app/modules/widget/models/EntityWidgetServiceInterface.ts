/* interface to be implemented by the seevices that empower the widget */
export interface EntityWidgetServiceInterface{
    entityKey: string //idntifier must be unique
    entitityLabel: string
    counterWidget:() => number
    adderWidget:() =>  number
}