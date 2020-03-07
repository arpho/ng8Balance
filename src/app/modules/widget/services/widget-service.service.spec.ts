import { TestBed } from '@angular/core/testing';

import { WidgetService } from './widget-service.';
import { Storage, IonicStorageModule } from '@ionic/storage';

describe('WidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[IonicStorageModule.forRoot()]
  }));

  it('should be created', () => {
    const service: WidgetService = TestBed.get(WidgetService);
    expect(service).toBeTruthy();
  });
});
