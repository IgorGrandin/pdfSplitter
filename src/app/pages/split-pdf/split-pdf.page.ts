import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-split-pdf',
  templateUrl: './split-pdf.page.html',
  styleUrls: ['./split-pdf.page.scss'],
})
export class SplitPdfPage implements OnInit {
  pdfSrc: any;
  pdfView: any;
  splitPdfs: Array<{ fileName: string; data: Uint8Array }> = [];
  onLoginForm!: FormGroup;
  disableButton: boolean = true;
  loading: any;

  constructor(
    private pdfService: PdfService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      formNumber: [''],
      formPrefix: [''],
    });
  }

  async loadPdf(file: File) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      this.pdfSrc = new Uint8Array(arrayBuffer);
      this.pdfView = new Uint8Array(arrayBuffer);
      this.disableButton = this.pdfSrc.length >= 1 ? false : true;
    };
    reader.readAsArrayBuffer(file);
  }

  async splitPdf() {
    if (!this.pdfSrc) {
      alert('Selecione um arquivo.');
      return;
    }

    let formData = {
      formPrefix: this.onLoginForm.controls['formPrefix'].value || '',
      formNumber: this.onLoginForm.controls['formNumber'].value || 1,
    };

    this.loading = await this.loadingCtrl.create();
    this.loading.present();

    const splitPdfs = await this.pdfService.splitPdf(this.pdfSrc, formData);
    this.splitPdfs = splitPdfs;

    this.downloadZip();
  }

  async downloadZip() {
    if (this.splitPdfs.length === 0) {
      return;
    }
    this.pdfService.zipAndDownloadPdfFiles(this.splitPdfs).then(() => {
      this.clearAll();
    });
  }

  clearPdf() {
    this.pdfSrc = null;
    this.pdfView = null;
    this.splitPdfs = [];
    this.disableButton = true;
    if (this.loading) setTimeout(() => this.loading.dismiss(), 2000);
  }

  async clearAll() {
    this.clearPdf();
    this.onLoginForm.reset();
  }
}
