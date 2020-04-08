import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WidgetDrawerComponent } from './widget-drawer.component';
import { WidgetService } from '../../services/widget-service.';
import { WidgetComponent } from '../widget/widget.component';
//import { IonicStorageModule } from '@ionic/storage';

describe('WidgetDrawerComponent', () => {
  let component: WidgetDrawerComponent;
  let fixture: ComponentFixture<WidgetDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDrawerComponent ],
      imports: [IonicModule.forRoot(),/* IonicStorageModule.forRoot() */,WidgetComponent],
      // providers:[WidgetService]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
