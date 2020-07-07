import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthGuard } from 'C:/Users/User/Desktop/UMVR/src/app/guard/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'search', loadChildren: '../search/search.module#SearchPageModule', canActivate: [AuthGuard] },
      { path: 'personal', loadChildren: '../personal/personal.module#PersonalPageModule', canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
      { path: 'communication', loadChildren: '../communication/communication.module#CommunicationPageModule', canActivate: [AuthGuard] },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
