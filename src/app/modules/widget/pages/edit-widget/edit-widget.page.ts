import { Component, OnInit } from '@angular/core';
import { CreateWidgetPage } from '../create-widget/create-widget.page';
import { WidgetService } from '../../services/widget-service.';
import { ModalController, NavParams } from '@ionic/angular';
import { Widget } from '../../models/Widget';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';

@Component({
  selector: 'app-edit-widget',
  templateUrl: '../create-widget/create-widget.page.html',
  styleUrls: ['./edit-widget.page.scss'],
})
export class EditWidgetPage extends CreateWidgetPage implements OnInit {
  widget

  constructor(public modalCtrl: ModalController, public service: WidgetService, public navParams: NavParams, public categories: CategoriesService, public suppliers: SuppliersService, public payments: PaymentsService) {
    super(modalCtrl, service, categories, payments, suppliers);
  }

  ngOnInit() {
    if (this.navParams.get('widget')) {
      this.widget = this.service.widgetFactory(this.navParams.get('widget').widget).load(this.navParams.get('widget'))
      this.title = `modifica widget ${this.widget.title}`
      this.widgetFields = super.FormFieldsFactory(this.widget)
    }
  }

  async submit(ev) {
    const widget = this.widget.load(ev)
    if (ev.entityKey) {

      widget.entityKey = ev.entityKey.key
    }
    // const out = await this.service.put(widget.key, widget.serialize(), v => {    })
    this.dismiss()
  }

}
