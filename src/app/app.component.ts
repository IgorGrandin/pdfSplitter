import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  public appPages = [
    { title: 'Split PDF', url: 'split-pdf', icon: 'documents' },
    { title: 'Merge PDF', url: 'merge-pdf', icon: 'duplicate' }
  ];
}
