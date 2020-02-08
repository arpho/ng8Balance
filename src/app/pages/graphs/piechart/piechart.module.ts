import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PiechartPage } from './piechart.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { UserModule } from '../../../modules/user/user.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

const routes: Routes = [
  {
    path: '',
    component: PiechartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicFormModule,
    UserModule,
    // GoogleChartsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [PiechartPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class PiechartPageModule { }
