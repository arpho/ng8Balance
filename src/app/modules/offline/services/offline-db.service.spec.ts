import { TestBed } from '@angular/core/testing';

import { OfflineDBService } from './offline-db.service';

describe('OfflineDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineDBService = TestBed.get(OfflineDBService);
    expect(service).toBeTruthy();
  });
});
