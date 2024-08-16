import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-merge-pdf',
  templateUrl: './merge-pdf.page.html',
  styleUrls: ['./merge-pdf.page.scss'],
})
export class MergePdfPage implements OnInit {
  pdfSrc: File[] = [];
  mergedPdf: Uint8Array = new Uint8Array();
  pdfFiles: { file: File; src: string; thumbnail: string }[] = [];
  internalEmitter: boolean = false;
  disableButton: boolean = true;
  loading: any;

  constructor(
    private pdfService: PdfService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  enableButton(status: any){
    console.log("Bloqueado: ", status);
    this.disableButton = status;
  }

  async loadPdf(files: any) {
    this.pdfFiles = files;
    this.pdfSrc = this.pdfFiles.map((file) => file.file);
  }

  async mergePdf() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();

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
      this.clearPdf();
    });
  }

  clearPdf() {
    this.pdfSrc = [];
    this.mergedPdf = new Uint8Array();
    this.internalEmitter = true;
    setTimeout(() => (this.internalEmitter = false), 0);
    if (this.loading) setTimeout(() => (this.loading.dismiss()), 2000);
  }
}
