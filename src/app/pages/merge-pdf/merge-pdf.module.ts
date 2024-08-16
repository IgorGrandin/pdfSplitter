import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MergePdfPageRoutingModule } from './merge-pdf-routing.module';

import { MergePdfPage } from './merge-pdf.page';
import { CustomMultipleFilesInputComponent } from 'src/app/components/custom-multiple-files-input/custom-multiple-files-input.component';
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MergePdfPageRoutingModule,
    PdfJsViewerModule,
    DragDropModule
  ],
  declarations: [MergePdfPage, CustomMultipleFilesInputComponent]
})
export class MergePdfPageModule {}
