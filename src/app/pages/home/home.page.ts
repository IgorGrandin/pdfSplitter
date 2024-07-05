import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pdfSrc: any;
  splitPdfs: Array<{ fileName: string, data: Uint8Array }> = [];
  onLoginForm!: FormGroup;

  constructor(private pdfService: PdfService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      formNumber: [''],
      formPrefix: [''],
      doc: ['']
    });
  }

  async loadPdf(event: any) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      this.pdfSrc = new Uint8Array(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  }

  async splitPdf() {
    if (!this.pdfSrc) {
      return;
    }

    let formData = {
      formPrefix : this.onLoginForm.controls['formPrefix'].value,
      formNumber : this.onLoginForm.controls['formNumber'].value
    }

    console.log("FormData: ", formData);

    const splitPdfs = await this.pdfService.splitPdf(this.pdfSrc, formData);
    this.splitPdfs = splitPdfs;

    this.downloadZip();
  }

  async downloadZip() {
    if (this.splitPdfs.length === 0) {
      return;
    }
    await this.pdfService.zipAndDownloadPdfFiles(this.splitPdfs);
  }

}
