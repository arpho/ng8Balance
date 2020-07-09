import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FidelityCardsPageRoutingModule } from './fidelity-cards-routing.module';

import { FidelityCardsPage } from './fidelity-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FidelityCardsPageRoutingModule
  ],
  declarations: [FidelityCardsPage]
})
export class FidelityCardsPageModule {}
