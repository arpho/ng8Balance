import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFidelityCardPageRoutingModule } from './update-fidelity-card-routing.module';

import { UpdateFidelityCardPage } from './update-fidelity-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateFidelityCardPageRoutingModule
  ],
  declarations: [UpdateFidelityCardPage]
})
export class UpdateFidelityCardPageModule {}
