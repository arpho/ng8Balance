import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/user/services/authguard';

const routes:  Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', loadChildren:()=>import( './home/home.module').then(m=>m.HomePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'list', loadChildren:()=>import( './list/list.module' ).then(m=>m.ListPageModule)
  { path: 'categorie', loadChildren:()=>import( './pages/categorie/categorie.module').then(m=>m.CategoriePageModule), canActivate: [AuthGuard] },
  { path: 'pagamenti', loadChildren:()=>import( './pages/pagamenti/payments.module').then(m=>m.PaymentsPageModule), canActivate: [AuthGuard] },
  { path: 'fornitori', loadChildren:()=>import( './pages/fornitori/fornitori.module').then(m=>m.FornitoriPageModule), canActivate: [AuthGuard] },
  {
    path: 'shopping-karts', loadChildren:()=>import( './pages/shoppingKarts/shopping-karts/shopping-karts.module').then(m=>m.ShoppingKartsPageModule), canActivate: [AuthGuard]
  },
  {path:'info/release', loadChildren:()=>import('./modules/info/pages/info/info.module').then(m=>m.InfoPageModule)},
  {path:'user/profile',loadChildren:()=>import('./modules/user/pages/profile/profile.module').then(m=>m.ProfilePageModule),canActivate:[AuthGuard]},
  {path:'user/users',loadChildren:()=>import('./modules/user/pages/users/users.module').then(m=>m.UsersPageModule),canActivate:[AuthGuard]},
  // { path: 'graphs', loadChildren: './pages/graphs/graphs.module#GraphsPageModule', canActivate: [AuthGuard] },
 // { path: 'graphs/piechart', loadChildren: './pages/graphs/piechart/piechart.module#PiechartPageModule', canActivate: [AuthGuard] },
  { path: 'detail-payment', loadChildren:()=>import( './pages/detail-payment/detail-payment.module').then(m=>m.DetailPaymentPageModule) },
  {
    path: 'create-widget',
    loadChildren: () => import('./modules/widget/pages/create-widget/create-widget.module').then( m => m.CreateWidgetPageModule)
  },
  {
    path: 'edit-widget',
    loadChildren: () => import('./modules/widget/pages/edit-widget/edit-widget.module').then( m => m.EditWidgetPageModule)
  },
//   { path: 'graphs/sankey', loadChildren: './pages/graphs/sankey/sankey.module#SankeyPageModule', canActivate: [AuthGuard] },
  //{ path: 'graphs/pareto', loadChildren: './pages/graphs/pareto/pareto.module#ParetoPageModule',canActivate:[AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
