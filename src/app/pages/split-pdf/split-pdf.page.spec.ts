import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitPdfPage } from './split-pdf.page';

describe('SplitPdfPage', () => {
  let component: SplitPdfPage;
  let fixture: ComponentFixture<SplitPdfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
