import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-custom-multiple-files-input',
  templateUrl: './custom-multiple-files-input.component.html',
  styleUrls: ['./custom-multiple-files-input.component.scss'],
})
export class CustomMultipleFilesInputComponent {
  @Output() filesSelected = new EventEmitter<
    { file: File; src: string; thumbnail: string }[]
  >();
  @Output() enableButton = new EventEmitter<boolean>();
  @Input() externalEmitter: boolean | undefined  ;
  pdfFiles: { file: File; src: string; thumbnail: string }[] = [];
  files: File[] = [];
  isDragOver = false;

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs';
  }

  ngOnChanges(){
    if(this.externalEmitter){
      this.deleteAllPdfs();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onReorder(
    event: CdkDragDrop<{ file: File; src: string; thumbnail: string }[]>
  ) {
    moveItemInArray(this.pdfFiles, event.previousIndex, event.currentIndex);
    this.filesSelected.emit(this.pdfFiles);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      this.prepareFilesList(droppedFiles);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.prepareFilesList(input.files);
    }
  }

  async prepareFilesList(files: FileList) {
    var file;
    for (let i = 0; i < files.length; i++) {
      file = files[i];

      this.pdfFiles.push({
        src: file.name,
        thumbnail: '',
        file: file,
      });
    }

    this.filesSelected.emit(this.pdfFiles);

    const thumbnailPromises = this.pdfFiles.map(async (pdfFile) => {
      const thumbnail = await this.generateThumbnail(pdfFile.file);
      pdfFile.thumbnail = thumbnail;
    });

    await Promise.all(thumbnailPromises);

    this.filesSelected.emit(this.pdfFiles);
    this.enableBtn();
  }

  async generateThumbnail(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.4 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (!context) {
      throw new Error('Failed to create canvas context');
    }

    await page.render({ canvasContext: context, viewport: viewport }).promise;

    return canvas.toDataURL();
  }

  deleteAllPdfs() {
    this.pdfFiles = [];
    this.files = [];

    this.filesSelected.emit(this.pdfFiles);
    this.enableBtn();
  }

  deleteThisPdf(fileName: string) {
    const index = this.pdfFiles.findIndex((file) => file.src === fileName);
    this.pdfFiles.splice(index, 1);

    this.filesSelected.emit(this.pdfFiles);
    this.enableBtn();
  }

  enableBtn(){
    var statusBtn = this.pdfFiles.length >= 2 ? false : true;
    this.enableButton.emit(statusBtn);
  }
}
