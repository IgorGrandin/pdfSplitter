import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MergePdfPage } from './merge-pdf.page';

describe('MergePdfPage', () => {
  let component: MergePdfPage;
  let fixture: ComponentFixture<MergePdfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
