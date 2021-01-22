import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingKartModel } from '../models/shoppingKartModel';
import { CategoriesService } from '../services/categories/categorie.service';
import { SuppliersService } from '../services/suppliers/suppliers.service';
import { PaymentsService } from '../services/payments/payments.service';
import { ShoppingKartsService } from '../services/shoppingKarts/shopping-karts.service';
import { CreateShoppingKartPage } from '../pages/create-shopping-kart/create-shopping-kart.page';
import { FidelityCardService } from '../services/fidelity-card.service';
import { DecoratorService } from '../modules/offline/business/decoratorItemService';
import { OfflineService } from '../modules/offline/services/offline.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalCtrl: ModalController,
    // initializing services, no good way
    private off:OfflineService,
    public ofline: DecoratorService,
    public categories: CategoriesService,
    public suppliers: SuppliersService,
    public payments: PaymentsService,
    public shoppingkarts: ShoppingKartsService,
    public FidelityCards: FidelityCardService
  ) { }

  async addShoppingKart() {
    const modal = await this.modalCtrl.create({ component: CreateShoppingKartPage })
    return await modal.present()

  }
}
