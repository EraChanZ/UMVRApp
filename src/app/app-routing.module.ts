import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
  {
    path: 'courtmap',
    loadChildren: () => import('./pages/courtmap/courtmap.module').then( m => m.CourtmapPageModule)
  },
  
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  //{ path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}