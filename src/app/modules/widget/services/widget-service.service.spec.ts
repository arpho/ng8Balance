import { TestBed } from '@angular/core/testing';

import { WidgetServiceService } from './widget-service.service';

describe('WidgetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetServiceService = TestBed.get(WidgetServiceService);
    expect(service).toBeTruthy();
  });
});
