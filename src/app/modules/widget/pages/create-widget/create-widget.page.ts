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
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { thresholdFreedmanDiaconis } from 'd3';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-widget',
  templateUrl: './create-widget.page.html',
  styleUrls: ['./create-widget.page.scss'],
})
export class CreateWidgetPage implements OnInit {
  title: string
  widgetFields: any[]
  widget: Widget
  Form: FormGroup

  dismiss(payment?) {
    this.modalCtrl.dismiss(payment)
  }

  constructor(public modalCtrl: ModalController, public service: WidgetService, public categoriesService: CategoriesService, public paymentsService: PaymentsService, public suppliersService: SuppliersService) {
    this.title = "crea un nuovo Widget"
    this.widget = new Widget()
    this.widgetFields = this.FormFieldsFactory()
  }

  filter(ev) {
    if (ev.serviceKey) {
      console.log('entity', ev.serviceKey)
      this.widgetFields = this.FormFieldsFactory(ev)
    }
  }


  widgetsServices: { options: RoleModel[], services: {} } = {
    options: [
      new RoleModel({ key: this.categoriesService.entityLabel, value: this.categoriesService.key }),
      new RoleModel({ key: this.paymentsService.entityLabel, value: this.paymentsService.key }),
      new RoleModel({ key: this.suppliersService.entityLabel, value: this.suppliersService.key })
    ],
    services: {}
  };

  protected FormFieldsFactory(ev?) {
    const out: QuestionBase<unknown>[] = [
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
        key: 'serviceKey',
        label: 'sorgente dati',
        options: this.widgetsServices.options,
        value: this.widget.serviceKey
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
      new SelectorQuestion({
        key: 'item',
        service: this.widgetsServices.services['categories'],
        label: 'seleziona  qualcosa',
        text: 'non so che scrivere',
        createPopup: undefined
      })
    ];
    if ((ev && ev.serviceKey) || this.widget.item)
      out.push(new SelectorQuestion({
        key: 'item',
        value: this.widget.item,
        service: ev.serviceKey ? this.widgetsServices.services[ev.serviceKey] : this.widget.serviceKey,
        label: 'seleziona  ' + this.widgetsServices.services[ev.serviceKey].title,
        text: 'non so che scrivere',
        createPopup: undefined
      }))
    return out
  }

  setForm(form: FormGroup) {
    this.Form = form
    // tslint:disable-next-line: no-string-literal
    this.Form.controls['serviceKey'].valueChanges.subscribe(ev => {
      console.log('changes', ev)
      this.widgetFields = this.FormFieldsFactory({ serviceKey: ev })
      // this.kartFields = this.setFormFields(this.kart, this.supplierFilterFunction)
    })
  }

  async submit(ev) {
    console.log('submitted', ev)
    const widget = new Widget(ev)
    if (ev.entityKey) {
      console.log('ev', ev)

      widget.entityKey = ev.entityKey.key
    }
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
    this.widgetsServices.services[this.categoriesService.key] = this.categoriesService
    this.widgetsServices.services[this.suppliersService.key] = this.suppliersService
    this.widgetsServices.services[this.paymentsService.key] = this.paymentsService
  }

}
