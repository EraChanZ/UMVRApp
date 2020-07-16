import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourtmapPage } from './courtmap.page';

const routes: Routes = [
  {
    path: '',
    component: CourtmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtmapPageRoutingModule {}
