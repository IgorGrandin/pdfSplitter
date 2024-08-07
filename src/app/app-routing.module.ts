import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'split-pdf',
    pathMatch: 'full'
  },
  {
    path: 'split-pdf',
    loadChildren: () => import('./pages/split-pdf/split-pdf.module').then( m => m.SplitPdfPageModule)
  },
  {
    path: 'merge-pdf',
    loadChildren: () => import('./pages/merge-pdf/merge-pdf.module').then( m => m.MergePdfPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
