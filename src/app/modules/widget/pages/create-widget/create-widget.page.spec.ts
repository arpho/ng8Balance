import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateWidgetPage } from './create-widget.page';

describe('CreateWidgetPage', () => {
  let component: CreateWidgetPage;
  let fixture: ComponentFixture<CreateWidgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWidgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWidgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
