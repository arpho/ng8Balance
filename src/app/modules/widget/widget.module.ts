import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDrawerComponent } from './components/widget-drawer/widget-drawer.component';
import { Storage } from '@ionic/storage';



@NgModule({
  declarations: [WidgetDrawerComponent],
  imports: [
    CommonModule
  ],
  providers:[Storage]
  ,
  exports:[WidgetDrawerComponent]
})
export class WidgetModule { }
