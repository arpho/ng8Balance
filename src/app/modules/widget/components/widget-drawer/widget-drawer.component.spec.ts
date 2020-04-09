import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WidgetDrawerComponent } from './widget-drawer.component';
import { WidgetService } from '../../services/widget-service.';
import { WidgetComponent } from '../widget/widget.component';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
//import { IonicStorageModule } from '@ionic/storage';

describe('WidgetDrawerComponent', () => {
  let component: WidgetDrawerComponent;
  let fixture: ComponentFixture<WidgetDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetDrawerComponent,WidgetComponent],
      imports: [IonicModule.forRoot()],
      providers: [WidgetService, ShoppingKartsService]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
