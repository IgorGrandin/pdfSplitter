import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private pdfService: PdfService,
    private formBuilder: FormBuilder
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
  }

  clearAll() {
    alert('Download Iniciado...');
    this.clearPdf();
    this.onLoginForm.reset();
  }
}
