import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDrawerComponent } from './components/widget-drawer/widget-drawer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [WidgetDrawerComponent],
  imports:[CommonModule, IonicModule.forRoot(), ReactiveFormsModule],
  //providers:[Storage],
  
  exports:[WidgetDrawerComponent]
})
export class WidgetModule { }
