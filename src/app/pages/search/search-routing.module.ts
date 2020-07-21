import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courtlist',
  },
  {
    path: '',
    component: SearchPage,
    children: [
      { 
        path: 'courtlist',
        canActivate: [AuthGuard],
        loadChildren: '../courtlist/courtlist.module#CourtlistPageModule',
      },
      { 
        path: 'courtmap',
        canActivate: [AuthGuard],
        loadChildren: '../courtmap/courtmap.module#CourtmapPageModule',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
