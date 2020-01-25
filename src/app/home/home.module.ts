import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { OnlineStatusModule } from '../modules/online-status/online-status.module';
import { CreateSupplierPage } from '../pages/create-supplier/create-supplier.page';
import { CreateShoppingKartPage } from '../pages/create-shopping-kart/create-shopping-kart.page';
import { FilterPopupPage } from '../modules/item/pages/filter-popup/filter-popup.page';
import { ViewSupplierPage } from '../pages/view-supplier/view-supplier.page';
import { SelectorItemsPage } from '../modules/item/pages/selector-items/selector-items.page';
import { CreatePurchasePage } from '../pages/create-purchase/create-purchase.page';
import { TotalComponent } from '../components/total/total.component';
import { DetailPurchasePage } from '../pages/detail-purchase/detail-purchase.page';
import { DetailShoppingKartPage } from '../pages/detail-shopping-kart/detail-shopping-kart.page';
import { CreatePaymentPage } from '../pages/create-payment/create-payment.page';
import { CategoriesSelectorComponent } from '../components/categories-selector/categories-selector.component';
import { CategoriesSelectorPage } from '../pages/categories-selector/categories-selector.page';
import { CategoryComponent } from '../components/category/category.component';
import { CategoriesViewerComponent } from '../components/categories-viewer/categories-viewer.component';
import { GoogleChartsModule } from 'angular-google-chart';
import { DetailCategoryPage } from '../pages/detail-category/detail-category.page';
import { DetailPaymentPage } from '../pages/detail-payment/detail-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineStatusModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  entryComponents: [
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    DetailShoppingKartPage,
    DetailPaymentPage,
    DetailCategoryPage,
    CreatePaymentPage,
    CategoriesSelectorPage
  ],
  declarations: [
    HomePage,
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    DetailCategoryPage,
    DetailPaymentPage,
    DetailShoppingKartPage,
    CreatePaymentPage,
    TotalComponent,
    CategoriesSelectorComponent,
    CategoriesSelectorPage,
    CategoryComponent,
    CategoriesViewerComponent]
})
export class HomePageModule { }
