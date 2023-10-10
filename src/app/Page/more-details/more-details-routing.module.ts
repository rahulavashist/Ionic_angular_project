import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsPage } from './more-details.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsPageRoutingModule {}
