import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionFormComponent } from '../question-form-component/question-form-component.component';
import { IonicModule } from '@ionic/angular';
import { GeoLocationModule } from 'src/app/modules/geo-location/geo-location.module';
import { ItemModule } from 'src/app/modules/item/item.module';
import { BarcodeModule } from 'src/app/modules/barcode/barcode.module';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent, QuestionFormComponent],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        GeoLocationModule,
        ItemModule,
        BarcodeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
