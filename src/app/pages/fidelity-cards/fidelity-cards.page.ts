import { Component, OnInit } from '@angular/core';
import { FidelityCardModel } from 'src/app/models/fidelityCardModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { FidelityCardService } from 'src/app/services/fidelity-card.service';
import { CreateFidelityCardPage } from '../create-fidelity-card/create-fidelity-card.page';
import { UpdateFidelityCardPage } from '../update-fidelity-card/update-fidelity-card.page';

@Component({
  selector: 'app-fidelity-cards',
  templateUrl: './fidelity-cards.page.html',
  styleUrls: ['./fidelity-cards.page.scss'],
})
export class FidelityCardsPage implements OnInit {
  public ItemsList: [FidelityCardModel]
  public fidelityCards: FidelityCardService
  public createModalPage = CreateFidelityCardPage
  public updateModalPage = UpdateFidelityCardPage

  constructor() { }

  ngOnInit() {
  }

  filter(filterParams: any) { // è possibile filtrare per titolo, nota  e ecommerce
    if (filterParams) {
      const filterTitle: (item: ItemModelInterface) => boolean = (!filterParams.title) ? (item: ItemModelInterface) => true :
        (item: ItemModelInterface) => (item.title) ? item.title.toLocaleLowerCase().includes(filterParams.title.toLowerCase()) : false;
      const filterNote = (!filterParams.note) ? (item: ItemModelInterface) => true :
        (item: ItemModelInterface) => item.note.toLocaleLowerCase().indexOf(filterParams.note.toLowerCase()) > -1;
      // combina le funzioni filtro elementari
    }

  }

}
