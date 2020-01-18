import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ItemModule } from '../app/modules/item/item.module'
import { GeoLocationModule } from './modules/geo-location/geo-location.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FilterPopupPage } from './modules/item/pages/filter-popup/filter-popup.page';
import { SelectorItemsPage } from './modules/item/pages/selector-items/selector-items.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    // FilterPopupPage,
    // SelectorItemsPage
  ],
  imports: [
    ItemModule,
    DynamicFormModule,
    GeoLocationModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
