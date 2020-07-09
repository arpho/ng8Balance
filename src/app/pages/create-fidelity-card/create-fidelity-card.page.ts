import { Component, OnInit } from '@angular/core';
import { FidelityCardsPageModule } from '../fidelity-cards/fidelity-cards.module';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { FidelityCardModel } from 'src/app/models/fidelityCardModel';
import { ModalController } from '@ionic/angular';
import { QuestionBarcode } from 'src/app/modules/dynamic-form/models/question-barcode';

@Component({
  selector: 'app-create-fidelity-card',
  templateUrl: './create-fidelity-card.page.html',
  styleUrls: ['./create-fidelity-card.page.scss'],
})
export class CreateFidelityCardPage implements OnInit {
  card= new FidelityCardModel()
  title = ' aggiungi fidelity card'
  cardFields = [
    new TextboxQuestion({
      key: 'title',
      label: 'titolo',
      order: 0,
      required: true,
      value: this.card.title
    }),
    new TextboxQuestion({
      key: 'note',
      label: 'note',
      value: this.card.note,
      order: 1
    }),
    new QuestionBarcode({
      key:'barcode',
      label:'codice',
      value:this.card.barcode,
      order:2
    })
  ]

  filter(v) {
    console.log('filter', v)
  }
  submit(v) {
    console.log('submit', v)
  }

  constructor(public modalCtrl:ModalController) {
   }

  ngOnInit() {
    
  }


  dismiss(card?) {
    this.modalCtrl.dismiss(card)
  }

}
