import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDrawerComponent } from './components/widget-drawer/widget-drawer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WidgetComponent } from './components/widget/widget.component';
import { UtilitiesModule } from '../utilities/utilities.module';
// import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [WidgetDrawerComponent,WidgetComponent],
  imports:[CommonModule, IonicModule.forRoot(), ReactiveFormsModule,UtilitiesModule],
  //providers:[Storage],

  
  exports:[WidgetDrawerComponent,WidgetComponent]
})
export class WidgetModule { }
