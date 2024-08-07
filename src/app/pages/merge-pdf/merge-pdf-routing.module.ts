import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MergePdfPage } from './merge-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: MergePdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergePdfPageRoutingModule {}
