import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateFidelityCardPage } from './update-fidelity-card.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { BarcodeModule } from 'src/app/modules/barcode/barcode.module';

describe('UpdateFidelityCardPage', () => {
  let component: UpdateFidelityCardPage;
  let fixture: ComponentFixture<UpdateFidelityCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFidelityCardPage ],
      imports: [
        IonicModule.forRoot(),
        DynamicFormModule,
        BarcodeModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateFidelityCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
