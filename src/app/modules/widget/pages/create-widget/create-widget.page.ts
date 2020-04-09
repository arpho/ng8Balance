import { Component, OnInit } from '@angular/core';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { Widget } from '../../models/Widget';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { ModalController } from '@ionic/angular';
import { WidgetService } from '../../services/widget-service.';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { RoleModel } from 'src/app/modules/user/models/privilegesLevelModel';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-create-widget',
  templateUrl: './create-widget.page.html',
  styleUrls: ['./create-widget.page.scss'],
})
export class CreateWidgetPage implements OnInit {
  title: string
  widgetFields: any[]
  widget: Widget

  dismiss(payment?) {
    this.modalCtrl.dismiss(payment)
  }

  constructor(public modalCtrl: ModalController, public service: WidgetService,public categoriesService:CategoriesService,public paymentsService:PaymentsService,public suppliersService:SuppliersService) {
    this.title = "crea un nuovo Widget"
    this.widget = new Widget()
    this.widgetFields = this.FormFieldsFactory()
  }

  filter(ev) {
  }

  widgetsServices= {
    services: [
      new RoleModel({ key: this.categoriesService.entityLabel, value: this.categoriesService.key }),
      new RoleModel({ key: this.paymentsService.entityLabel, value: this.paymentsService.key }),
      new RoleModel({ key: this.suppliersService.entityLabel, value: this.suppliersService.key })
    ]
  };

  protected FormFieldsFactory() {
    return  [
      new TextboxQuestion({
        key: 'title',
        label: 'nome del widget',
        value: this.widget.title,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.widget.note,
        order: 2
      }),
      new DropdownQuestion({
        key:'serviceKey',
        label:'sorgente dati',
        options: this.widgetsServices.services,
        value:this.widget.serviceKey
      }),
      new SwitchQuestion({
        key: 'counter',
        label: 'contatore/sommatore',
        labelTrue: 'widget contatore',
        labelFalse: ' widget sommatore',
        iconFalse: 'calculator',

        iconTrue: 'stopwatch',
        value: this.widget.counter,
        required: false,
        order: 4
      }),
    ];;
  }

  async submit(ev) {
    console.log('submitted', ev)
    const widget = new Widget(ev)
    console.log(' new widget', widget.serialize())
    const out = await this.service.add(widget.serialize())
    this.dismiss()
    /*   this.service.put(String(this.widget.key), this.widget.serialize(), (v) => {
      v.then((wid => {
        console.log('created', wid)
        this.dismiss()
      }))
    })   */
  }

  ngOnInit() {
  }

}
