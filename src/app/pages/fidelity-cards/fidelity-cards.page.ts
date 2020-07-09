import { Component, OnInit } from '@angular/core';
import { FidelityCardModel } from 'src/app/models/fidelityCardModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Component({
  selector: 'app-fidelity-cards',
  templateUrl: './fidelity-cards.page.html',
  styleUrls: ['./fidelity-cards.page.scss'],
})
export class FidelityCardsPage implements OnInit {
  public ItemsList: [FidelityCardModel]

  constructor() { }

  ngOnInit() {
  }

  filter(filterParams: any) { // è possibile filtrare per titolo, nota  e ecommerce
    if (filterParams) {
      const filterTitle: (item: ItemModelInterface) => boolean = (!filterParams.title) ? (item: ItemModelInterface) => true :
        (item: ItemModelInterface) => (item.title)? item.title.toLocaleLowerCase().includes(filterParams.title.toLowerCase()):false;
      const filterNote = (!filterParams.note) ? (item: ItemModelInterface) => true :
        (item: ItemModelInterface) => item.note.toLocaleLowerCase().indexOf(filterParams.note.toLowerCase()) > -1;
      this.filterFunction = (item: ItemModelInterface) => filterNote(item) && filterTitle(item);
      const filterEcommerce: (item: ItemModelInterface) => boolean = (!filterParams.ecommerce) ? (item: ItemModelInterface) => true :
        (item: SupplierModel) => item.ecommerce;
      // combina le funzioni filtro elementari
      this.filterFunction = (item: ItemModelInterface) => filterEcommerce(item) && filterNote(item) && filterTitle(item);
    }

  }

}
