import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-merge-pdf',
  templateUrl: './merge-pdf.page.html',
  styleUrls: ['./merge-pdf.page.scss'],
})
export class MergePdfPage implements OnInit {
  pdfSrc: File[] = [];
  mergedPdf: Uint8Array = new Uint8Array();

  constructor(private pdfService: PdfService) {}

  ngOnInit() {}

  async loadPdf(files: File[]) {
    this.pdfSrc = files;
  }

  async mergePdf() {
    const mergedPdf = await this.pdfService.mergePdfs(this.pdfSrc);

    if (mergedPdf) {
      this.mergedPdf = mergedPdf;
      this.downloadMergedPdf();
    }
  }

  async downloadMergedPdf() {
    if (this.mergedPdf.length === 0) {
      return;
    }
    this.pdfService.downloadPdf(this.mergedPdf).then(() => {
      this.clearAll();
    });
  }

  clearPdf() {
    this.pdfSrc = [];
    this.mergedPdf = new Uint8Array();
  }

  clearAll() {
    alert('Download Iniciado...');
    this.clearPdf();
  }

  removeFile(index: number) {
    this.pdfSrc.splice(index, 1);
  }

  moveUp(index: number) {
    if (index > 0) {
      [this.pdfSrc[index], this.pdfSrc[index - 1]] = [
        this.pdfSrc[index - 1],
        this.pdfSrc[index],
      ];
    }
  }

  moveDown(index: number) {
    if (index < this.pdfSrc.length - 1) {
      [this.pdfSrc[index], this.pdfSrc[index + 1]] = [
        this.pdfSrc[index + 1],
        this.pdfSrc[index],
      ];
    }
  }
}
