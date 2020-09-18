import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/user/services/authguard';

const routes:  Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', loadChildren:()=>import( './home/home.module').then(m=>m.HomePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'list', loadChildren:()=>import( './list/list.module' ).then(m=>m.ListPageModule)},
  { path: 'categorie', loadChildren:()=>import( './pages/categorie/categorie.module').then(m=>m.CategoriePageModule), canActivate: [AuthGuard] },
  { path: 'pagamenti', loadChildren:()=>import( './pages/pagamenti/payments.module').then(m=>m.PaymentsPageModule), canActivate: [AuthGuard] },
  { path: 'fornitori', loadChildren:()=>import( './pages/fornitori/fornitori.module').then(m=>m.FornitoriPageModule), canActivate: [AuthGuard] },
  {
    path: 'shopping-karts', loadChildren:()=>import( './pages/shoppingKarts/shopping-karts/shopping-karts.module').then(m=>m.ShoppingKartsPageModule), canActivate: [AuthGuard]
  },
  {path:'fidelityCards',loadChildren:()=>import('./pages/fidelity-cards/fidelity-cards.module').then(m=>m.FidelityCardsPageModule),canActivate:[AuthGuard]},
  {path:'info/release', loadChildren:()=>import('./modules/info/pages/info/info.module').then(m=>m.InfoPageModule)},
  {path:'user/profile',loadChildren:()=>import('./modules/user/pages/profile/profile.module').then(m=>m.ProfilePageModule),canActivate:[AuthGuard]},
  {path:'user/users',loadChildren:()=>import('./modules/user/pages/users/users.module').then(m=>m.UsersPageModule),canActivate:[AuthGuard]},
  { path: 'detail-payment', loadChildren:()=>import( './pages/detail-payment/detail-payment.module').then(m=>m.DetailPaymentPageModule) },
  {
    path: 'create-widget',
    loadChildren: () => import('./modules/widget/pages/create-widget/create-widget.module').then( m => m.CreateWidgetPageModule)
  },
  {
    path: 'edit-widget',
    loadChildren: () => import('./modules/widget/pages/edit-widget/edit-widget.module').then( m => m.EditWidgetPageModule)
  },
  {
    path: 'fidelity-cards',
    loadChildren: () => import('./pages/fidelity-cards/fidelity-cards.module').then( m => m.FidelityCardsPageModule)
  },
  {
    path: 'create-fidelity-card',
    loadChildren: () => import('./pages/create-fidelity-card/create-fidelity-card.module').then( m => m.CreateFidelityCardPageModule)
  },
  {
    path: 'update-fidelity-card',
    loadChildren: () => import('./pages/update-fidelity-card/update-fidelity-card.module').then( m => m.UpdateFidelityCardPageModule)
  },
  {
    path: 'scanner-popup',
    loadChildren: () => import('./modules/barcode/pages/scanner-popup/scanner-popup.module').then( m => m.ScannerPopupPageModule)
  },
  {
    path: 'dev',
    loadChildren: () => import('./modules/offline/pages/dev/dev.module').then( m => m.DevPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
