import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-custom-multiple-files-input',
  templateUrl: './custom-multiple-files-input.component.html',
  styleUrls: ['./custom-multiple-files-input.component.scss'],
})
export class CustomMultipleFilesInputComponent {
  @Output() filesSelected = new EventEmitter<File[]>();
  files: File[] = [];
  isDragOver = false;

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

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        if (file.type === 'application/pdf') {
          this.files.push(file);
        }
      }
      this.filesSelected.emit(this.files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (file.type === 'application/pdf') {
          this.files.push(file);
        }
      }
      console.log("Files Emitted: ", this.files);
      this.filesSelected.emit(this.files);
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.filesSelected.emit(this.files);
  }

  moveUp(index: number) {
    if (index > 0) {
      [this.files[index], this.files[index - 1]] = [this.files[index - 1], this.files[index]];
      this.filesSelected.emit(this.files);
    }
  }

  moveDown(index: number) {
    if (index < this.files.length - 1) {
      [this.files[index], this.files[index + 1]] = [this.files[index + 1], this.files[index]];
      this.filesSelected.emit(this.files);
    }
  }
}
