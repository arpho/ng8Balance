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
import {  IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FilterPopupPage } from './modules/item/pages/filter-popup/filter-popup.page';
import { SelectorItemsPage } from './modules/item/pages/selector-items/selector-items.page';
import { GoogleChartModule} from 'angular-google-chart'
import {StoreModule} from '@ngrx/store'
import { InfoModule } from './modules/info/info.module';
import { CreateSupplierPage } from './pages/create-supplier/create-supplier.page';
import { CreateShoppingKartPage } from './pages/create-shopping-kart/create-shopping-kart.page';
import { ViewSupplierPage } from './pages/view-supplier/view-supplier.page';
import { CreatePurchasePage } from './pages/create-purchase/create-purchase.page';
import { TotalComponent } from './components/total/total.component';
import { DetailPurchasePage } from './pages/detail-purchase/detail-purchase.page';
import { DetailShoppingKartPage } from './pages/detail-shopping-kart/detail-shopping-kart.page';
import { CreatePaymentPage } from './pages/create-payment/create-payment.page';
import { CategoriesSelectorComponent } from './components/categories-selector/categories-selector.component';
import { CategoriesSelectorPage } from './pages/categories-selector/categories-selector.page';
import { CategoryComponent } from './components/category/category.component';
import { CategoriesViewerComponent } from './components/categories-viewer/categories-viewer.component';
import { GoogleChartsModule } from 'angular-google-chart';
import { DetailCategoryPage } from './pages/detail-category/detail-category.page';
import { DetailPaymentPage } from './pages/detail-payment/detail-payment.page';
import { WidgetModule } from './modules/widget/widget.module';
import { CreateWidgetPage } from './modules/widget/pages/create-widget/create-widget.page';
import { EditWidgetPage } from './modules/widget/pages/edit-widget/edit-widget.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { RoundPipe } from './modules/utilities/pipes/round.pipe';
import { EditUserPage } from './modules/user/pages/edit-user/edit-user.page';
import { BarcodeModule } from './modules/barcode/barcode.module';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { UpdateFidelityCardPage } from './pages/update-fidelity-card/update-fidelity-card.page';
import { CreateFidelityCardPage } from './pages/create-fidelity-card/create-fidelity-card.page';
import { ScannerPopupPage } from './modules/barcode/pages/scanner-popup/scanner-popup.page';
@NgModule({
  entryComponents: [
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    CreateWidgetPage,
    EditWidgetPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    EditUserPage,
    DetailShoppingKartPage,
    ScannerPopupPage,
    UpdateFidelityCardPage,
    CreateFidelityCardPage,
    DetailPaymentPage,
    DetailCategoryPage,
    CreatePaymentPage,
    CategoriesSelectorPage
  ],
  declarations: [
    AppComponent,
     CreateWidgetPage,
     EditWidgetPage,
     SelectorItemsPage,
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    DetailCategoryPage,
    EditUserPage,
    DetailPaymentPage,
    UpdateFidelityCardPage,
    CreateFidelityCardPage,
    DetailShoppingKartPage,
    ScannerPopupPage,
    CreatePaymentPage,
    TotalComponent,
    CategoriesSelectorComponent,
    CategoriesSelectorPage,
    CategoryComponent,
    CategoriesViewerComponent],

  imports: [
    BarcodeModule,
    ItemModule,
    WidgetModule,
    NgxBarcode6Component,
    UtilitiesModule,
    DynamicFormModule,
    GeoLocationModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    OnlineStatusModule,
    //GoogleChartModule.forRoot(),
    OnlineStatusModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [
    NativeAudio,
    StatusBar,
    BarcodeScanner,
    RoundPipe,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
