import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWidgetPage } from './edit-widget.page';

describe('EditWidgetPage', () => {
  let component: EditWidgetPage;
  let fixture: ComponentFixture<EditWidgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWidgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWidgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
