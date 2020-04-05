import { Component, OnInit } from '@angular/core';
import { CreateWidgetPage } from '../create-widget/create-widget.page';
import { WidgetService } from '../../services/widget-service.';
import { ModalController, NavParams } from '@ionic/angular';
import { Widget } from '../../models/Widget';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';

@Component({
  selector: 'app-edit-widget',
  templateUrl: '../create-widget/create-widget.page.html',
  styleUrls: ['./edit-widget.page.scss'],
})
export class EditWidgetPage  extends CreateWidgetPage implements OnInit {
  widget

  constructor(public modalCtrl: ModalController,public service:WidgetService,public navParams:NavParams) {
    super(modalCtrl,service);
  }
  widgetFieldsFactory(){
    return [
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
    ];
  }

  ngOnInit() {
    this.widget = new Widget( this.navParams.get('widget'))
    this.title = 'modifica widget'
    console.log(`updating`,this.widget)
    this.widgetFields = this.widgetFieldsFactory()
  }

}
