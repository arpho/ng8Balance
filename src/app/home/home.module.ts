import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { OnlineStatusModule } from '../modules/online-status/online-status.module';
import { WidgetModule } from '../modules/widget/widget.module';
import { UtilitiesModule } from '../modules/utilities/utilities.module';
import { BarcodeModule } from '../modules/barcode/barcode.module';
@NgModule({
  imports: [
    BarcodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineStatusModule,
    WidgetModule,
    UtilitiesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
