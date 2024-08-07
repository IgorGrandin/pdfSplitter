import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomMultipleFilesInputComponent } from './custom-multiple-files-input.component';

describe('CustomMultipleFilesInputComponent', () => {
  let component: CustomMultipleFilesInputComponent;
  let fixture: ComponentFixture<CustomMultipleFilesInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMultipleFilesInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomMultipleFilesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
