import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsPageRoutingModule } from './more-details-routing.module';

import { MoreDetailsPage } from './more-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsPageRoutingModule
  ],
  declarations: [MoreDetailsPage]
})
export class MoreDetailsPageModule {}
