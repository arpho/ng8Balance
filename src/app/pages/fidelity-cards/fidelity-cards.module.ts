import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FidelityCardsPageRoutingModule } from './fidelity-cards-routing.module';

import { FidelityCardsPage } from './fidelity-cards.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FidelityCardsPageRoutingModule,
    ItemModule
  ],
  declarations: [FidelityCardsPage]
})
export class FidelityCardsPageModule {}
