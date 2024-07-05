import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import JSZip from 'jszip';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async loadPdf(pdfBytes: Uint8Array) {
    const pdfDoc = await PDFDocument.load(pdfBytes);

    //this.splitPdf(pdfDoc);

    return pdfDoc;
  }

  async splitPdf(pdfBytes: Uint8Array, formData: any) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const pdfs = [];

    console.log('formData.formPrefix', formData.formPrefix);
    console.log('formData.formPrefix.length', formData.formPrefix.length);
    console.log('formData.formNumber', formData.formNumber);

    formData.formPrefix.length > 0 ? (formData.formPrefix += ' ') : null;

    for (let i = 0; i < pages.length; i++) {
      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);
      const pdfBytes = await newPdfDoc.save();
      pdfs.push({
        fileName: `${formData.formPrefix + (formData.formNumber + i)}.pdf`,
        data: pdfBytes,
      });
    }

    console.log('pdfs: ', pdfs);

    return pdfs;
  }

  async savePdf(pdfBytes: Uint8Array, fileName: string) {
    const base64 = this.uint8ArrayToBase64(pdfBytes);

    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    return fileName;
  }

  async getPdfUrl(fileName: string) {
    const fileUri = await Filesystem.getUri({
      path: fileName,
      directory: Directory.Documents,
    });

    return fileUri.uri;
  }

  async zipAndDownloadPdfFiles(
    pdfs: Array<{ fileName: string; data: Uint8Array }>
  ) {
    const zip = new JSZip();

    for (const pdf of pdfs) {
      zip.file(pdf.fileName, pdf.data, { binary: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });

    const blob = new Blob([content], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pdfs.zip';

    // link.addEventListener('click', (event) => {
    //   console.log(event);
    //   alert('Download Concluído');
    // });

    link.click();
    URL.revokeObjectURL(url);
  }

  uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binary);
  }
}
