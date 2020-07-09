import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { OnlineStatusModule } from '../modules/online-status/online-status.module';
import { WidgetModule } from '../modules/widget/widget.module';
import { BarcodeModule } from '../modules/barcode/barcode.module';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { IonicStorageModule, Storage } from '@ionic/storage';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers:[NativeAudio],
      imports: [IonicModule.forRoot(),OnlineStatusModule,WidgetModule,BarcodeModule/* IonicStorageModule.forRoot() */]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
