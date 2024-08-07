import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitPdfPage } from './split-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: SplitPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPdfPageRoutingModule {}
