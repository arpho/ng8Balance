import { Component, OnInit } from '@angular/core';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { Widget } from '../../models/Widget';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { ModalController } from '@ionic/angular';
import { WidgetService } from '../../services/widget-service.';

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

  constructor(public modalCtrl: ModalController, public service: WidgetService) {
    this.title = "crea un nuovo Widget"
    this.widget = new Widget()
    this.widgetFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'nome del widget',
        value: this.widget._title,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.widget._note,
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

  filter(ev) {
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
