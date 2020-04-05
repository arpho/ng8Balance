import { TestBed } from '@angular/core/testing';

import { IDBWidgetServiceService } from './idbwidget-service.service';

describe('IDBWidgetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IDBWidgetServiceService = TestBed.get(IDBWidgetServiceService);
    expect(service).toBeTruthy();
  });
});
