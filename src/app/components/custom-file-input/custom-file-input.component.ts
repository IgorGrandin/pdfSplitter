import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-custom-file-input',
  templateUrl: './custom-file-input.component.html',
  styleUrls: ['./custom-file-input.component.scss']
})
export class CustomFileInputComponent {
  @Output() fileSelected = new EventEmitter<File>();
  fileName: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileSelected.emit(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = (event.target as HTMLElement).closest('.file-drop-area');
    if (dropArea) {
      dropArea.classList.add('dragover');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = (event.target as HTMLElement).closest('.file-drop-area');
    if (dropArea) {
      dropArea.classList.remove('dragover');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = (event.target as HTMLElement).closest('.file-drop-area');
    if (dropArea) {
      dropArea.classList.remove('dragover');
    }
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileName = file.name;
      this.fileSelected.emit(file);
    }
  }
}
