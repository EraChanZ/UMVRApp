import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourtmapPageRoutingModule } from './courtmap-routing.module';

import { CourtmapPage } from './courtmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourtmapPageRoutingModule
  ],
  declarations: [CourtmapPage]
})
export class CourtmapPageModule {}
