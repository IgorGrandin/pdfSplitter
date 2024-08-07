import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPdfPageRoutingModule } from './split-pdf-routing.module';

import { SplitPdfPage } from './split-pdf.page';
import { CustomFileInputComponent } from 'src/app/components/custom-file-input/custom-file-input.component';
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SplitPdfPageRoutingModule,
    CustomFileInputComponent,
    PdfJsViewerModule
  ],
  declarations: [SplitPdfPage]
})
export class SplitPdfPageModule {}
