import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { reducers, metaReducers } from './reducers';
import { OnlineStatusModule } from './modules/online-status/online-status.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ItemModule } from '../app/modules/item/item.module'
import { GeoLocationModule } from './modules/geo-location/geo-location.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FilterPopupPage } from './modules/item/pages/filter-popup/filter-popup.page';
import { SelectorItemsPage } from './modules/item/pages/selector-items/selector-items.page';
import { GoogleChartModule} from 'angular-google-chart'
import {StoreModule} from '@ngrx/store'

@NgModule({
  declarations: [AppComponent, FilterPopupPage, SelectorItemsPage],
  entryComponents: [
    FilterPopupPage,
    SelectorItemsPage
  ],
  imports: [
    ItemModule,
    DynamicFormModule,
    GeoLocationModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    OnlineStatusModule,
    // GoogleChartModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
