import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {DynamicFormModule} from '../../../dynamic-form/dynamic-form.module'
import { CreateWidgetPage } from './create-widget.page';

describe('CreateWidgetPage', () => {
  let component: CreateWidgetPage;
  let fixture: ComponentFixture<CreateWidgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWidgetPage ],
      imports: [IonicModule.forRoot(),DynamicFormModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWidgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
