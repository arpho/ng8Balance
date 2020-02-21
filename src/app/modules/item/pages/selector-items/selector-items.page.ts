// tslint:disable: semicolon
import { Component, OnInit, OnChanges, SimpleChanges, } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { ComponentRef } from '@ionic/core';
import { ModalsService } from '../../services/modals/modals-service';

@Component({
  selector: 'app-selector-items-page',
  templateUrl: './selector-items.page.html',
  styleUrls: ['./selector-items.page.scss'],
})
export class SelectorItemsPage implements OnInit, OnChanges {
  selectedItem: ItemModelInterface
  title: string
  service: ItemServiceInterface
  itemsList: Array<ItemModelInterface>
  filterText: string
  modalB: Promise<HTMLIonModalElement>
  createPopup: ComponentRef
  filterFunction: any // (item: ItemModelInterface) => boolean
  sorterFunction: any // (a: ItemModelInterface, b: ItemModelInterface) => number
  modalId: number

  constructor(public modalCtrl: ModalController, public navParams: NavParams, public modalsService: ModalsService) {
    this.title = `Seleziona  ${this.navParams.get('title')}`
    this.selectedItem = this.navParams.get('item')
    this.service = this.navParams.get('service')
    this.createPopup = this.navParams.get('createPopup')
    this.filterFunction = this.navParams.get('filterFunction')
    this.sorterFunction = this.navParams.get('sorterFunction')
    this.modalId = this.navParams.get('modalId')
  }
  async createItem() {
    const modal = await this.modalCtrl.create({ component: this.createPopup })

    modal.onDidDismiss().then(item => {
      this.modalsService.dismissModal(this.modalId, item.data)
      // this.selected(item.data)
    })

    return await modal.present()

  }

  ngOnInit() {
    if (this.service) {
      this.service.getEntitiesList().on('value', snap => {
        this.itemsList = []
        snap.forEach(item => {
          const Item = this.service.getDummyItem()
          Item.key = item.key;
          Item.build(item.val())
          Item.service = this.service;
          this.itemsList.push(Item)

        })
      }

      )
    }
  }
  filter(ev) {
    this.filterFunction = (item: ItemModelInterface) => (item.title) ? item.title.toUpperCase().includes(ev.detail.value.toUpperCase()) : false
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sorterFunction) {
      this.sorterFunction = changes.sorterFunction
    }
    if (changes.filterFunction) {
      this.filterFunction = changes.filterFunction
    }
  }

  selected(item: ItemModelInterface) {
    console.log('slected', item)
    this.selectedItem = item
    this.dismiss(item)
  }


  dismiss(item?: ItemModelInterface) {
    console.log('dismissing', item)
    this.selectedItem = item
    this.modalCtrl.dismiss(item)
  }

}
